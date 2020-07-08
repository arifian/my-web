(ns covid-lambda.core
    (:require [covid-lambda.config :as cfg]
              [covid-lambda.clients :as clients]
              [covid-lambda.s3 :as s3]
              [java-time :as jtime])
    (:gen-class
     :methods [^:static [handler [java.util.Map] String]]))

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
  (let [init-config   (when (= nil @cfg/my-config) (cfg/get-config))
        _ (println (->cljmap s))]
    (str "helo")))
