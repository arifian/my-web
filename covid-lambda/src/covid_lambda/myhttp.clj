(ns covid-lambda.myhttp
  (:require [clj-http.client :as http]
            [clojure.data.json :as json]
            [clojure.edn :as edn]
            [clojure.set :as cset]
            ;; [java-time :as jtime]
            [clj-time.core :as t]
            ))



(defn get-data [my-url]
  (-> my-url
      (->> http/get)
      (select-keys [:status :body])))

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

(defn get-daily-data []
  (if-let [data ;; (http-normalized-data "https://api.kawalcorona.com/indonesia")
           nil
           ]
    (kkd-normalize data)
    (if-let [data  (http-normalized-data "https://covid19.mathdro.id/api/countries/indonesia")
             ;; nil
             ]
      (mathdroid-normalize data)
      nil)))



(comment
  
  (json/write-str (get-daily-data))
  
  (get-normalized-data "https://api.kawalcorona.com/indonesia")
  (get-normalized-data "https://covid19.mathdro.id/api/countries/indonesia")
  (get-normalized-data "https://api.kawalcorona.com/indonesia/provinsi")
  
  "daily"
  {(-> "https://api.kawalcorona.com/indonesia"
       (->> http/get)
       (select-keys [:status :body]))
   
   {:status 200,
    :body   [{"name"      "Indonesia",
              "positif"   "68,079",
              "sembuh"    "31,585",
              "meninggal" "3,359",
              "dirawat"   "33,135"}]}}
  
  {(-> "https://covid19.mathdro.id/api/countries/indonesia"
       (->> http/get)
       (select-keys [:status :body]))
   {:status 200,
    :body
    {"confirmed"
     {"value" 68079,
      "detail"
      "https://covid19.mathdro.id/api/countries/indonesia/confirmed"},
     "recovered"
     {"value" 31585,
      "detail"
      "https://covid19.mathdro.id/api/countries/indonesia/recovered"},
     "deaths"
     {"value" 3359,
      "detail"
      "https://covid19.mathdro.id/api/countries/indonesia/deaths"},
     "lastUpdate" "2020-07-09T05:33:56.000Z"}}}
  
  {(-> "https://api.kawalcorona.com/indonesia/provinsi"
       (->> http/get)
       (select-keys [:status :body]))

   {:status 200,
    :body
    [{"attributes"
      {"FID"        15,
       "Kode_Provi" 35,
       "Provinsi"   "Jawa Timur",
       "Kasus_Posi" 14321,
       "Kasus_Semb" 4996,
       "Kasus_Meni" 1053}}
     {"attributes"
      {"FID"        11,
       "Kode_Provi" 31,
       "Provinsi"   "DKI Jakarta",
       "Kasus_Posi" 12667,
       "Kasus_Semb" 8036,
       "Kasus_Meni" 649}}]}}
  
  "time-series"
  (-> "https://api.covid19api.com/country/indonesia/status/confirmed"
      (->> http/get)
      (select-keys [:status :body]))

  )
