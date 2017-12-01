(require '[clojure.string :as str])

(defn captcha [string]
  (let [ numbers (map #(Integer/parseInt %) (str/split (str string (first string)) #"")) ]
    (reduce + (keep-indexed #(if (== (nth numbers (- %1 1) 0) %2) %2) numbers))))

(defn halfway [coll index]
  (if (>= (+ index (/ (count coll) 2)) (count coll))
    (nth coll (- (+ index (/ (count coll) 2)) (count coll)))
    (nth coll (+ index (/ (count coll) 2)))))

(defn captchaTwo [string]
  (let [ numbers (map #(Integer/parseInt %) (str/split string #"")) ]
    (reduce + (keep-indexed #(if (== (halfway numbers %1) %2) %2) numbers))))
