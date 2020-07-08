(ns covid-lambda.clients
  (:require [clojure.core.async :as async :refer (<!!)]
            [cognitect.aws.client.api :as aws]
            [covid-lambda.config :as cfg]
            [clj-http.client :as http]))

;; s3

(declare s3)

(def s3 (aws/client {:api :s3}))

(defn put-into-bucket [country mystring]
  (aws/invoke s3 {:op :PutObject :request {:Bucket (str "covid.arifian.net/data/" country)
                                           :Key "hello.json"
                                           :Body (.getBytes mystring)}}))

#_(put-into-bucket "indonesia" "HI")

#_(http/get "https://api.covid19api.com/live/country/indonesia")

#_(http/get "https://www.data.kemkes.go.id/data/api/analytics.json"
            {:accept       :json
             :query-params {"dimension"       "pe:TODAY"
                            "filter"          "ou:amZZzlibrMp"
                            "skipData"        "false"
                            "skipMeta"        "false"
                            "includeNumDen"   "false"
                            "displayProperty" "SHORTNAME"}})

"https://data.kemkes.go.id/data/api/analytics.json?
dimension=dx:U7BaEXUa1Ii&
dimension=pe:TODAY&
filter=ou:amZZzlibrMp&
skipData=false&
skipMeta=false&
includeNumDen=false&
displayProperty=SHORTNAME"
