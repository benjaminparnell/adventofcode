(require '[clojure.string :as str])

(defn captcha [string]
  (let [ numbers (map #(Integer/parseInt %) (str/split (str string (first string)) #"")) ]
    (reduce + (keep-indexed #(if (== (nth numbers (- %1 1) 0) %2) %2) numbers))))
