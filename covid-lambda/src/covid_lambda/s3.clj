(ns covid-lambda.s3
  (:require [cognitect.aws.client.api :as aws]
            [clojure.java.io :as io]
            ;; [covid-lambda.config :as cfg]
            ))

(declare s3)

(def s3 (aws/client {:api :s3}))

(defn put-into-bucket [country myfile mystring]
  (aws/invoke s3 {:op :PutObject :request {:Bucket (str "covid.arifian.net/data/" country)
                                           :Key myfile
                                           :Body (.getBytes mystring)}}))

(defn get-from-bucket [country myfile]
  (aws/invoke s3 {:op :GetObject :request {:Bucket (str "covid.arifian.net/data/" country)
                                           :Key myfile}}))

(defn copy-into-bucket [country myfile blob]
  (aws/invoke s3 {:op :PutObject :request {:Bucket (str "covid.arifian.net/data/" country)
                                           :Key myfile
                                           :Body blob}}))

#_(put-into-bucket "indonesia" "test.json" "HI")

#_(copy-into-bucket "indonesia" "test.json" (:Body (get-from-bucket "indonesia" "now.json")))

#_(aws/doc s3 :PutObject)
