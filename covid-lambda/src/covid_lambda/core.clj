(ns covid-lambda.core
  (:require [covid-lambda.myhttp :as mh]
            [covid-lambda.s3 :as s3]
            ;; [java-time :as jtime]
            )
  (:gen-class
   :methods [^:static [handler [java.util.Map] String]]))

(set! *print-level* false)
(set! *print-length* false)

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
  (let [_ (println (->cljmap s))]
    (str "helo")))
