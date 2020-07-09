(defproject covid-lambda "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [org.clojure/data.json "0.2.6"]
                 ;; [clojure.java-time "0.3.2"]
                 [clj-time "0.15.2"]
                 [clj-http "3.10.1"]
                 [com.cognitect.aws/api "0.8.301"]
                 [com.cognitect.aws/s3 "714.2.430.0"]
                 [com.cognitect.aws/endpoints "1.1.11.537"]]
  :resource-paths ["config"]
  :profiles {:repl    {:source-paths   ["dev" "src" "src_net"]
                       :resource-paths ["config" "resources" "test/resources"]
                       :jvm-opts       ["-Djavax.net.ssl.trustStore"]
                       :dependencies   [[org.clojure/tools.namespace "0.2.10"]
                                        [io.pedestal/pedestal.service-tools "0.5.5"]]}
             :uberjar {:jvm-opts ["-Dclojure.compiler.direct-linking=true"
                                  "-Djavax.net.ssl.trustStore"]
                       :aot      [covid-lambda.core]}}
  :main ^{:skip-aot true} covid-lambda.core
  :repl-options {:init-ns user}
  ;; :aot :all
  )
