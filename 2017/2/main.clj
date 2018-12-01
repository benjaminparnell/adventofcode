(defn checksum [rows]
  (reduce + (map #(- (apply max %) (apply min %)) rows)))
