cd /home/vname
echo "<org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl plugin='plain-credentials@1.7'>
<scope>GLOBAL</scope>
<id>AzureStorageAccountkey</id>
<description>Azure Storage Account Key </description>
<secret>testkey</secret>
</org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>" \
| java -jar jenkins-cli.jar \
-auth admin:passwordjenkins \
-s http://localhost:8080 \
-webSocket create-credentials-by-xml system::system::jenkins _

echo "<com.microsoft.azure.util.AzureCredentials plugin='azure-credentials@4.0.2'>
<scope>GLOBAL</scope>
<id>azsp</id>
<description>The Azure Service Principal for the Jenkins </description>
<data>
<subscriptionId>subscriptionid</subscriptionId>
<clientId>clientid</clientId>
<clientSecret>appSecret</clientSecret>
<certificateId></certificateId>
<tenant>tenantid</tenant>
<azureEnvironmentName>Azure</azureEnvironmentName>
</data>
</com.microsoft.azure.util.AzureCredentials>" \
| java -jar jenkins-cli.jar \
-auth admin:passwordjenkins \
-s http://localhost:8080 \
-webSocket create-credentials-by-xml system::system::jenkins _



echo "<com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl plugin='credentials@1214.v1de940103927'>
<scope>GLOBAL</scope>
<id>ACR</id>
<description>Azure Container registy </description>
<username>testuser</username>
<password>testpassword</password>
</com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl>" \
| java -jar jenkins-cli.jar \
-auth admin:passwordjenkins \
-s http://localhost:8080  \
-webSocket create-credentials-by-xml system::system::jenkins _

cd /home/vname
echo "<org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl plugin='plain-credentials@1.7'>
<scope>GLOBAL</scope>
<id>resourcegroup</id>
<description>Azure Resource Group </description>
<secret>testresourcegroup</secret>
</org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>" \
| java -jar jenkins-cli.jar \
-auth admin:passwordjenkins \
-s http://localhost:8080 \
-webSocket create-credentials-by-xml system::system::jenkins _


cd /home/vname
echo "<org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl plugin='plain-credentials@1.7'>
<scope>GLOBAL</scope>
<id>cluster</id>
<description>Azure AKS name </description>
<secret>testcluster</secret>
</org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl>" \
| java -jar jenkins-cli.jar \
-auth admin:passwordjenkins \
-s http://localhost:8080 \
-webSocket create-credentials-by-xml system::system::jenkins _