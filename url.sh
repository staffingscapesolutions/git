cd /home/vname
wget http://localhost:8080/jnlpJars/jenkins-cli.jar
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin terraform:1.0.10
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin ansicolor:1.0.2
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin azure-credentials:242.vb_f9c4fa_6b_2b_6
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin azure-cli:0.9
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin kubernetes-cli:1.11.0
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin kubernetes:3794.v45d9da_33d7f1
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin docker-workflow:528.v7c193a_0b_e67c
sudo java -jar ./jenkins-cli.jar -s http://localhost:8080 -auth admin:password install-plugin docker-plugin:1.2.10

 
