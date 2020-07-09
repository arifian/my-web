#!/bin/bash

lein uberjar && aws lambda update-function-code \
		    --function-name covid-lambda \
		    --zip-file fileb://./target/covid-lambda-0.1.0-SNAPSHOT-standalone.jar

lein clean
