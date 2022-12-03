package main

import (
	"bufio"
	"fmt"
	"os"
)

func parseFileToLines() []string {
	file, err := os.Open("input.txt")

	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines
}

func toPriority(char rune) int {
	if char > 96 {
		return int(char) - 96
	}

	return int(char) - 38
}

func main() {
	lines := parseFileToLines()
	var priorities int = 0

	for _, line := range lines {
		letterMap := make(map[rune]int)
		partSize := len(line) / 2
		partA := line[0:partSize]
		partB := line[partSize:]

		for _, c := range partA {
			letterMap[c] = 1
		}

		for _, c := range partB {
			if letterMap[c] == 1 {
				priorities += toPriority(c)
				break
			}
		}
	}

	fmt.Printf("Part one: %v\n", priorities)
	priorities = 0

	var group []string

	for _, line := range lines {
		group = append(group, line)

		if len(group) == 3 {
			// This map is keyed by the character, and the values are maps which tell
			// you which of the bags each letter appeared in.
			// I have regret.
			bagMap := make(map[rune]map[int]int)

			for bagIndex, bag := range group {
				for _, c := range bag {
					_, bagOk := bagMap[c]

					if !bagOk {
						bagMap[c] = make(map[int]int)
					}

					_, ok := bagMap[c][bagIndex]

					if !ok {
						bagMap[c][bagIndex] = 1
					}
				}
			}

			for k, v := range bagMap {
				if len(v) == 3 {
					priorities += toPriority(k)
				}
			}

			group = nil
		}
	}

	fmt.Printf("Part two: %v\n", priorities)
}
