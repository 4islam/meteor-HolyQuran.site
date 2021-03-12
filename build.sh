#!/usr/bin/env bash
sudo npm install -g npm
meteor update
npm update
meteor update --all-packages
npx browserslist@latest --update-db

if [ -n "$1" ]; then
  #meteor build ../HQVC_ServerConfig/app/HQVC_Advance/$1 --architecture os.linux.x86_64 --server https://holyquran.site --directory
  meteor build ../HQVC_ServerConfig/home/centos/upload/$1 --architecture os.linux.x86_64 --server https://holyquran.site
  scp -P2222 ../HQVC_ServerConfig/home/centos/upload/$1 centos@158.69.72.248:/home/centos/upload
else
  #echo "Useage: ./build.sh Target_Folder_Version_Number  (example: ./build.sh 2.2)"
  meteor build ../HQVC_ServerConfig/home/centos/upload --architecture os.linux.x86_64 --server https://holyquran.site
fi
scp -P2222 ../HQVC_ServerConfig/home/centos/upload/HQVC.tar.gz centos@158.69.72.248:/home/centos/upload
