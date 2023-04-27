#!/bin/bash
nohup mongod 2>&1 &
node bundle/main.js

