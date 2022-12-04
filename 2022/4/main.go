package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
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

func toRanges(pairs []string) [][]int {
	var ranges [][]int

	for _, pair := range pairs {
		pairRangeStr := strings.Split(pair, "-")
		pairRange := make([]int, 2)
		pairRange[0], _ = strconv.Atoi(pairRangeStr[0])
		pairRange[1], _ = strconv.Atoi(pairRangeStr[1])
		ranges = append(ranges, pairRange)
	}

	return ranges
}

func fitsIn(a, b []int) bool {
	if a[0] >= b[0] && a[1] <= b[1] {
		return true
	}

	if b[0] >= a[0] && b[1] <= a[1] {
		return true
	}

	return false
}

func overlaps(a, b []int) bool {
	numberMap := make(map[int]int)

	for item := a[0]; item <= a[1]; item++ {
		numberMap[item] = 1
	}

	for item := b[0]; item <= b[1]; item++ {
		if numberMap[item] == 1 {
			return true
		}
	}

	return false
}

func main() {
	lines := parseFileToLines()
	containingPairs := 0
	overlappingPairs := 0

	for _, line := range lines {
		pairs := strings.Split(line, ",")
		ranges := toRanges(pairs)
		if fitsIn(ranges[0], ranges[1]) {
			containingPairs++
		}

		if overlaps(ranges[0], ranges[1]) {
			overlappingPairs++
		}
	}

	fmt.Printf("Part one: %v\n", containingPairs)
	fmt.Printf("Part two: %v\n", overlappingPairs)
}
