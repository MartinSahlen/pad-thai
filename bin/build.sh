#! /bin/bash

if  [ -n "${NODE_ENV}" ] && [ "$NODE_ENV" == "production" ];  then
    bower install
    gulp dist --environment=production
  else
    echo "missing environment variables for building"
    exit 1
  fi
else
  echo "Node environment is not set to production, so will not build anything"
fi 
