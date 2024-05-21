Install-Module Az.Accounts -Force -AllowClobber
$ApplicationId= ""
$ClientSecret= ""
$TenantId = ""
$subscriptionID =""
$userPassword = ConvertTo-SecureString -String $ClientSecret -AsPlainText -Force
$Credential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $ApplicationId , $userPassword
Connect-AzAccount -ServicePrincipal -TenantId $TenantId -SubscriptionId $subscriptionID -Credential $Credential
$Storageaccount= Read-Host "Enter the Storage account Name"
$ResourceGroupName = Read-Host "Enter the Resource Group Name"
$clustername= Read-Host "Enter the name of the cluster"
$StorageAccountKey=$(az storage account keys list --resource-group $ResourceGroupName --account-name $Storageaccount --query "[0].value" --output tsv)
$Containertegistry = Read-Host "Enter the container registry Name"
$ContainerAdminUser=$(az acr credential show -n $Containertegistry -g $ResourceGroupName --query username -o tsv)
$passwordjenkins=Read-Host "Enter the jenkins Password"
$ContainerAdminPassword=$(az acr credential show -n $Containertegistry -g $ResourceGroupName --query passwords[0].value -o tsv)

$getcontent = Get-content -Path 'C:/Users/admin/Desktop/credentials.sh'

$getcontent.Replace("http://localhost:8080","$result").Replace("testkey","$StorageAccountKey").Replace("passwordjenkins","$passwordjenkins").Replace("subscriptionid","$subscriptionID").Replace("clientid","$ApplicationId").Replace("appSecret","$ClientSecret").Replace("tenantid","$TenantId").Replace("testuser","$ContainerAdminUser").Replace("testresourcegroup","$ResourceGroupName").Replace("testcluster","$clustername").Replace("testpassword","$ContainerAdminPassword").Replace("cd /home/vname","cd /home/$username") | Out-File 'C:/Users/admin/Desktop/credentials_update.sh'

Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptPath 'C:\Users\admin\Desktop\credentials_update.sh'
