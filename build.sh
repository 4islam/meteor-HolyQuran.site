#!/usr/bin/env bash
meteor update
npm update
meteor update --all-packages
meteor build ../HQVC_ServerConfig/app/HQVC_Advance/2.2 --architecture os.linux.x86_64 --server https://holyquran.site --directory
