(ns covid-lambda.s3
  (:require [cognitect.aws.client.api :as aws]
            ;; [covid-lambda.config :as cfg]
            ))

(declare s3)

(def s3 (aws/client {:api :s3}))

(defn put-into-bucket [country myfile mystring]
  (aws/invoke s3 {:op :PutObject :request {:Bucket (str "covid.arifian.net/data/" country)
                                           :Key myfile
                                           :Body (.getBytes mystring)}}))

#_(put-into-bucket "indonesia" "HI")
