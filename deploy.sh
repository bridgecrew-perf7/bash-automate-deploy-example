tar czf prod.tar.gz public src package.json package-lock.json LICENSE
scp prod.tar.gz 185.201.9.141:~
rm prod.tar.gz