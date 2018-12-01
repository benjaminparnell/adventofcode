(require '[clojure.string :as str])

(defn readFileToLines [path]
  (str/split-lines (slurp path)))

(defn validate [distinctFn passphrase]
  (== (count (str/split passphrase #" ")) (count (distinctFn passphrase))))

(defn countValidPhrasesInFile [path distinctFn]
  (count (filter (partial validate distinctFn) (readFileToLines path))))

(defn allDistinctWords [passphrase]
  (distinct (str/split passphrase #" ")))

(defn noAnagrams [passphrase]
  (distinct (map #(str (sort (str/split %1 #""))) (str/split passphrase #" "))))
