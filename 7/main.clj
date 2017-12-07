(require '[clojure.string :as str])

(defn parse-program-line [line]
  (hash-map :name (first (str/split line #" ")),
            :weight (Integer. (re-find #"\d+" (get (str/split line #" ") 1))),
            :children (str/split (or (get (str/split line #"-> ") 1) "") #", ")))

(defn parent-of [node tree]
  (first (filter #(some #{(node :name)} (%1 :children)) tree)))

(defn find-root [tree]
  (loop [node (first tree)]
    (if (not (parent-of node tree))
      node
      (recur (parent-of node tree)))))

(defn make-program-tree [path]
  (map parse-program-line ((comp str/split-lines slurp) path)))
