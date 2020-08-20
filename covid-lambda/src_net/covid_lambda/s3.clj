(ns covid-lambda.s3
  (:require [cognitect.aws.client.api :as aws]
            [clojure.java.io :as io]))


#_(put-into-bucket "indonesia" "test.json" "HI")

#_(copy-into-bucket "indonesia" "test.json" (:Body (get-from-bucket "indonesia" "now.json")))

#_(aws/doc s3 :PutObject)

