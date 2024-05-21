#-------Intalling Az Modules and Creating a Resource Group -----------------

#Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force -AllowClobber
Install-Module Az.Accounts -Force -AllowClobber
$ApplicationId= ""
$ClientSecret= ""
$TenantId = ""
$subscriptionID =""
$userPassword = ConvertTo-SecureString -String $ClientSecret -AsPlainText -Force
$Credential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $ApplicationId , $userPassword
Connect-AzAccount -ServicePrincipal -TenantId $TenantId -SubscriptionId $subscriptionID -Credential $Credential
$ResourceGroupName = Read-Host "Enter the resource group name"
try {
    Get-AzResourceGroup -Name $ResourceGroupName -ErrorAction Stop
    Write-Host "Resource group exists." -ForegroundColor Red
}
catch {

    Write-Host "Resource group does not exist.  It will now be created." -ForegroundColor Green
    try {
        New-AzResourceGroup -Name $ResourceGroupName -Location 'East us' -Verbose -ErrorAction Stop        
        Write-Host "Completed!" -ForegroundColor DarkGreen        
    }
    catch {
        Write-Host "Failed to create resource group"
        exit        
    }
}

#---------------------To create a Storage Account---------------------------
$Storageaccount = Read-Host "Enter the storage account name to store the terraform state file"
try {
    Get-AzStorageAccount -Name $ResourceGroupName -$Storageaccount -ErrorAction Stop
    Write-Host "storage account  exists." -ForegroundColor Red
}
catch {

    Write-Host "storage account does not exist.  It will now be created." -ForegroundColor Green
    try {

        $storageAcc =  New-AzStorageAccount -ResourceGroupName $ResourceGroupName -Location 'East us' -Name $Storageaccount -SkuName 'Standard_LRS' -Kind 'StorageV2'
        $ctx=$storageAcc.Context
        New-AzStorageContainer -Name 'demo' -Context $ctx -Permission Container     
        Write-Host "Completed!" -ForegroundColor DarkGreen        
    }
    catch {
        Write-Host "Failed to crete a storage account"
        exit        
    }
}
#-------- To create a Azure Container regirsty----------------
$Containertegistry = Read-Host "Enter the container registry Name"
try {
    Get-AzContainerRegistry -Name $ResourceGroupName -$Containertegistry -ErrorAction Stop
    Write-Host "Container registry  exists." -ForegroundColor Red
}
catch {

    Write-Host "Container registry does not exist.  It will now be created." -ForegroundColor Green
    try {

        New-AzContainerRegistry -ResourceGroupName $ResourceGroupName -Name $Containertegistry -EnableAdminUser -Sku Basic        
        Write-Host "Completed!" -ForegroundColor DarkGreen        
    }
    catch {
        Write-Host "Failed to create a Container registry"
        exit        
    }
}

#-----Creating Ubuntu Machine-----------------------

$vmname = Read-Host "Enter the vm name"
$pubIP = Read-Host "Enter the public IP address Name"
$username = Read-Host "Enter the user name of vm"
$credential = Get-Credential
#$jenkinsfilepath = Read-Host "Enter the Path of the jenkins admin password to store"

try {
    Get-Azvm -Name $ResourceGroupName -$vnname -ErrorAction Stop
    Write-Host " vm Resource  exists." -ForegroundColor Red
}
catch {

    Write-Host "vm Resource  does not exist.  It will now be created." -ForegroundColor Green
    try {
        New-Azvm -ResourceGroupName $ResourceGroupName -Name $vmname -Location Eastus  -PublicIpAddressName $pubIP -Size Standard_D2s_v3 -OpenPorts 80,22,8080 -Credential $credential -Image "Canonical:UbuntuServer:18_04-daily-lts-gen2:Latest"     
        Write-Host " VM Creation Completed!" -ForegroundColor DarkGreen
        Write-Host "Installing Jenkins"
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString 'sudo apt-get install openjdk-11-jre -y'
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString 'sudo  wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -'
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  "sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list' "
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  'sudo apt update && sudo apt install jenkins -y '
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  ' sudo systemctl start jenkins'
        Write-Host "Completed Jenkins Installed"
        Write-Host "Installing Azure CLI"
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  'sudo curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash '
        Write-Host "Completed Azure CLI"
        Write-Host "Installing Kubectl"
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  'sudo snap install kubectl --classic '
        Write-Host "Completed kubectl installation"
        Write-Host "Installing DOcker"
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  'sudo apt update && sudo apt install apt-transport-https ca-certificates curl software-properties-common && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - && sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" && sudo apt install docker-ce -y'
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  'sudo usermod -a -G docker jenkins'
        Write-Host "Docker Installed"
        Write-Host "Get the  Jenkins admins Password and store in the local PC"
        Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptString  ' sudo cat /var/lib/jenkins/secrets/initialAdminPassword' |  Out-file -Path 'C:\Users\admin\Desktop\jenkins.txt'
    }
    catch {
        Write-Host "Failed to create resource"
        exit        
    }
}

#----------- Get the IP address of VM -----------------------

Write-Host "Copy the VM frontendIP adress"
Get-AzPublicIpAddress  -ResourceGroupName $ResourceGroupName -Name $pubIP | Select-Object "IpAddress" 



