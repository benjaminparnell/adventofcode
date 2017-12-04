(require '[clojure.string :as str])

(defn readFile [path]
  (str/split-lines (slurp path)))

(defn validate [passphrase]
  (== (count (str/split passphrase #" ")) (count (distinct (str/split passphrase #" ")))))

(defn validateAll [path]
  (count (filter true? (map validate (readFile path)))))
