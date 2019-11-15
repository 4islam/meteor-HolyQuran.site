#!/usr/bin/env bash
meteor update
npm update
meteor update --all-packages
meteor build ../HQVC_ServerConfig/home/centos/upload/ --architecture os.linux.x86_64 --server https://holyquran.site
