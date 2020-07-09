(ns covid-lambda.core
  (:require [covid-lambda.myhttp :as mh]
            [covid-lambda.s3 :as s3]
            [clojure.data.json :as json]
            [clojure.edn]
            [clj-time.core :as t])
  (:gen-class
   :methods [^:static [handler [java.util.Map] String]]))

;; (set! *print-level* false)
;; (set! *print-length* false)

;; to parse json params from invoke

(defprotocol ConvertibleToClojure
  (->cljmap [o]))

(extend-protocol ConvertibleToClojure
  java.util.Map
  (->cljmap [o] (let [entries (.entrySet o)]
                  (reduce (fn [m [^String k v]]
                            (assoc m (keyword k) (->cljmap v)))
                          {} entries)))

  java.util.List
  (->cljmap [o] (vec (map ->cljmap o)))

  java.lang.Object
  (->cljmap [o] o)

  nil
  (->cljmap [_] nil))

;; main handler

;; (java.util.Time.)

(defn -handler [s]
  (let [input   (->cljmap s)
        _       (println input)
        opt     (:opt input)
        now-utc (->> (t/now)
                     str
                     (take 13)
                     (apply str))]
    (case opt
      "run-task-now-data"          (if-let [data (mh/get-live-data)]
                                     (do (s3/copy-into-bucket "indonesia/live-archive"
                                                              (str "now-" now-utc ".json")
                                                              (get (s3/get-from-bucket "indonesia" "now.json") :Body))
                                         (str (s3/put-into-bucket "indonesia"
                                                                  "now.json"
                                                                  (json/write-str data))))
                                     (str nil))
      "run-task-now-data-province" (if-let [data (-> "https://covid19.mathdro.id/api/countries/indonesia"
                                                     mh/get-data
                                                     :body)]
                                     (do (s3/copy-into-bucket "indonesia/live-province-archive"
                                                              (str "now-province-" now-utc ".json")
                                                              (get (s3/get-from-bucket "indonesia" "now-province.json") :Body))
                                         (str (s3/put-into-bucket "indonesia"
                                                                  "now-province.json"
                                                                  data)))
                                     (str nil))
      "run-task-time-series"       (if-let [data (-> "https://api.covid19api.com/total/dayone/country/indonesia"
                                                     mh/get-data
                                                     :body)]
                                     (do (s3/copy-into-bucket "indonesia/time-series-archive"
                                                              (str "time-series-" now-utc ".json")
                                                              (get (s3/get-from-bucket "indonesia" "time-series.json") :Body))
                                         (str (s3/put-into-bucket "indonesia"
                                                                  "time-series.json"
                                                                  data)))
                                     (str nil))
      "task-not-found")))

(comment
  (-handler {"opt" "run-task-now-data"})
  (-handler {"opt" "run-task-now-data-province"})
  (-handler {"opt" "run-task-time-series"})
  (-handler {"opt" "ipsum"})
  
  )
