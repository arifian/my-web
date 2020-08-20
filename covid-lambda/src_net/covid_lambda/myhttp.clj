(ns covid-lambda.myhttp
  (:require [clj-http.client :as http]
            [clojure.data.json :as json]
            [clojure.edn :as edn]
            [clojure.set :as cset]
            ;; [java-time :as jtime]
            [clj-time.core :as t]))

(comment
  
  (json/write-str (get-live-data))
  (get-data "https://api.kawalcorona.com/indonesiaa")
  (get-data "https://covid19.mathdro.id/api/countries/indonesia")
  (get-data "https://api.kawalcorona.com/indonesia/provinsi")
  
  "time-series"
  (spit "logs/time-series-sample.edn"
        (:body (http-normalized-data "https://api.covid19api.com/total/dayone/country/indonesia")))
  (def a (clojure.edn/read-string (slurp "logs/time-series-sample.edn")))

  (-> "https://api.covid19api.com/country/indonesia/status/confirmed"
      (->> http/get)
      (select-keys [:status :body]))

  )
