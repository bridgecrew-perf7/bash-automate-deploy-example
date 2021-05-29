tar czf prod.tar.gz public src package.json package-lock.json LICENSE
scp -i id_rsa prod.tar.gz root@185.201.9.141:~/hafisalrizal.com.prod
rm prod.tar.gz