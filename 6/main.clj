(defn get-next-index [coll index]
  (mod index (count coll)))

(defn previous-combination [colls coll]
  (some (comp zero? (partial compare coll)) colls))

(defn redistribute [coll]
  (loop [numberToDistribute (apply max coll)
        index (inc (.indexOf coll numberToDistribute))
        banks (assoc coll (.indexOf coll numberToDistribute) 0)]
    (if (zero? numberToDistribute)
      banks
      (recur (dec numberToDistribute) (inc index) (assoc banks (get-next-index banks index) (inc (nth banks (get-next-index banks index))))))))

(defn countFirstRepeatedState [coll]
  (loop [states []
        state (redistribute coll)]
    (if (previous-combination states state)
      (count (conj states state))
      (recur (conj states state) (redistribute state)))))

(defn getFirstRepeatedState [coll]
  (loop [states (conj [] coll)
        state (redistribute coll)]
    (if (previous-combination states state)
      (apply - (reverse (keep-indexed #(if (zero? (compare state %2)) %1) (conj states state))))
      (recur (conj states state) (redistribute state)))))
