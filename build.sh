#!/usr/bin/env bash
if [ -n "$1" ]; then
  meteor update
  npm update
  meteor update --all-packages
  meteor build ../HQVC_ServerConfig/app/HQVC_Advance/$1 --architecture os.linux.x86_64 --server https://holyquran.site --directory
else
  #echo "Useage: ./build.sh Target_Folder_Version_Number  (example: ./build.sh 2.2)"
  meteor build ../HQVC_ServerConfig/home/centos/upload --architecture os.linux.x86_64 --server https://holyquran.site 
fi
