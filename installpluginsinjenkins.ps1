#---------------Installing Plugins in Jenkins -------------------------------
$passwordjenkins= Read-Host "Enter the Jenkins Password"
$uri =":8080"
$proto= "http://"
$ipad = Read-Host "Enter the IP address"
$result= [System.String]::Concat($proto,$ipad,$uri)
#$result1 = echo "wget $result"
$getcontent = Get-content -Path 'C:/Users/admin/Desktop/url.sh'

$getcontent.Replace("http://localhost:8080","$result").Replace("cd /home/vname","cd /home/$username").Replace("password","$passwordjenkins") | Out-File 'C:/Users/admin/Desktop/url_updated.sh'

#echo "wget $result " |  Out-file -Path 'C:\Users\admin\Desktop\url2.bash'
Invoke-AzVMRunCommand -ResourceGroupName $ResourceGroupName -Name $vmname -CommandId 'RunShellScript' -ScriptPath 'C:\Users\admin\Desktop\url_updated.sh'

Write-Host "Installed Plugins into Jenkins"