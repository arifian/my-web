(ns covid-lambda.myhttp
  (:require [clj-http.client :as http]
            [clojure.data.json :as json]
            [clojure.edn :as edn]
            [clojure.set :as cset]
            ;; [java-time :as jtime]
            [clj-time.core :as t]))

(defn get-data [my-url]
  (try
    (-> my-url
        (->> http/get)
        (select-keys [:status :body]))
    (catch Exception e nil)))

(defn http-normalized-data [my-url]
  (let [data       (get-data my-url)
        get-status (:status data)]
    (if (= 200 get-status)
      (assoc (update data :body json/read-str) :url my-url)
      ;; (assoc data :url my-url)
      nil)))

(defn kkd-normalize-fix-body [data]
  (let [k (keys data)
        v (mapv #(clojure.edn/read-string (clojure.string/replace % #"\D+" ""))
                (vals data))]
    (zipmap k v)))

(defn system-now []
  (str (t/to-time-zone (t/now) (t/time-zone-for-offset +7))))

(defn kkd-normalize [data]
  (-> data
      (update :body first)
      (update :body #(dissoc % "name"))
      (update :body kkd-normalize-fix-body)
      (update :body #(cset/rename-keys % {"positif"   "confirmed"
                                          "sembuh"    "recovered"
                                          "meninggal" "deaths"
                                          "dirawat"   "treated"}))
      (assoc "lastUpdate" (system-now))))

(defn mathdroid-normalize [data]
  (-> data
      (update-in [:body "confirmed"] #(get % "value"))
      (update-in [:body "recovered"] #(get % "value"))
      (update-in [:body "deaths"] #(get % "value"))
      (update-in [:body] #(dissoc % "lastUpdate"))
      (update-in [:body] #(assoc % "treated" nil))
      (assoc "lastUpdate" (system-now))))

(defn get-live-data []
  (if-let [data (http-normalized-data "https://api.kawalcorona.com/indonesia")
           ;; nil
           ]
    (kkd-normalize data)
    (if-let [data  (http-normalized-data "https://covid19.mathdro.id/api/countries/indonesia")
             ;; nil
             ]
      (mathdroid-normalize data)
      nil)))

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
