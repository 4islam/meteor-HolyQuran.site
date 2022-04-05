#!/usr/bin/env bash
sudo npm install -g npm
meteor update
npm update
meteor update --all-packages
npx browserslist@latest --update-db
meteor npm install

ver=`cat package.json | grep version | grep -oE "\"[^\"]+\"," | sed "s/[\",]//g"`

if [ -n "$1" ]; then
  #meteor build ../HQVC_ServerConfig/app/HQVC_Advance/$1 --architecture os.linux.x86_64 --server https://holyquran.site --directory
  meteor build ../HQVC_ServerConfig/home/centos/upload/$1 --architecture os.linux.x86_64 --server https://holyquran.site
  scp -P2222 ../HQVC_ServerConfig/home/centos/upload/$1 centos@158.69.72.248:/home/centos/upload
else
  #echo "Useage: ./build.sh Target_Folder_Version_Number  (example: ./build.sh 2.2)"
  meteor build ../HQVC_ServerConfig/home/centos/upload/build --architecture os.linux.x86_64 --server https://holyquran.site
  mkdir ../HQVC_ServerConfig/home/centos/upload/build/temp
  tar -xzf ../HQVC_ServerConfig/home/centos/upload/build/*.tar.gz -C ../HQVC_ServerConfig/home/centos/upload/build/temp
  cp Docker* ../HQVC_ServerConfig/home/centos/upload/build/temp
  docker build  ../HQVC_ServerConfig/home/centos/upload/build/temp -t "hqvc:$ver"
  rm -fr ../HQVC_ServerConfig/home/centos/upload/build/temp
  echo ""
  echo "--- To run locally, use the following command: ---"
  echo "docker run -it -p 3000:3000 -e ESHOST=docker.for.mac.localhost:9200 hqvc:$ver"
  echo ""
  echo "--- To push to AWS (once you are authenticated to AWS CLI): ---"
  echo "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 190285172867.dkr.ecr.us-east-1.amazonaws.com"
  echo "docker tag hqvc:$ver 190285172867.dkr.ecr.us-east-1.amazonaws.com/hqvc:$ver"
  echo "docker push 190285172867.dkr.ecr.us-east-1.amazonaws.com/hqvc:$ver"
  echo ""
  echo ""
  #scp -P2222 ../HQVC_ServerConfig/home/centos/upload/HQVC.tar.gz centos@158.69.72.248:/home/centos/upload
fi
