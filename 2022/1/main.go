package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
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

func main() {
	lines := parseFileToLines()

	var foodAmounts []int64
	var currentAmount int64 = 0

	for _, line := range lines {
		if line != "" {
			number, _ := strconv.ParseInt(line, 0, 64)
			currentAmount += number
		} else {
			foodAmounts = append(foodAmounts, currentAmount)
			currentAmount = 0
		}
	}

	sort.Slice(foodAmounts, func(a, b int) bool { return foodAmounts[a] < foodAmounts[b] })

	lastIndex := len(foodAmounts) - 1
	topThree := foodAmounts[lastIndex-2 : lastIndex+1]
	var topThreeSum int64 = 0
	for _, amount := range topThree {
		topThreeSum += amount
	}

	fmt.Printf("Part one: %v\n", foodAmounts[lastIndex])
	fmt.Printf("Part two: %v\n", topThreeSum)
}
