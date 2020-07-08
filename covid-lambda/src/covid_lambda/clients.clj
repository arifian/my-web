(ns covid-lambda.clients
    (:require [clojure.core.async :as async :refer (<!!)]
              [cognitect.aws.client.api :as aws]
              [covid-lambda.config :as cfg]))

;; s3

(declare s3)

(def s3 (aws/client {:api :s3}))
