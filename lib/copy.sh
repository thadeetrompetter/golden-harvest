#!/bin/bash
LOCAL_DIR="/Volumes/Voorhoede/www/voorhoedecla/"
REMOTE_DIR="/home/thadee/voorhoedecla"

rsync -av --exclude=*/ $LOCAL_DIR thadee@swaggo.nl:$REMOTE_DIR
#ssh thadee@swaggo.nl "cd $REMOTE_DIR && docker build -t thadee/decla . && docker run -d -p 127.0.0.1:3000:3000 thadee/decla node index.js"
