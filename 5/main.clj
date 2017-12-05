(require '[clojure.string :as str])

(defn readFileToLines [path]
  (str/split-lines (slurp path)))

(defn getStepsToEnd [index steps coll]
  (if (> (inc index) (count coll))
    steps
    (recur
      (+ index (nth coll index))
      (inc steps)
      (assoc coll index (inc (nth coll index))))))

(defn getStepsToEnd2 [index steps coll]
  (if (> (inc index) (count coll))
    steps
    (recur
      (+ index (nth coll index))
      (inc steps)
      (assoc coll index (if (>= (nth coll index) 3) (dec (nth coll index)) (inc (nth coll index)))))))
