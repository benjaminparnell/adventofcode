package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func parseFileToLines() []string {
	file, err := os.Open("example.txt")

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

func isInterestingCycle(cycle int) bool {
	cycles := []int{20, 60, 100, 140, 180, 220}
	for _, interestingCycle := range cycles {
		if interestingCycle == cycle {
			return true
		}
	}
	return false
}

func printCrt(crt [][]string) {
	for x := range crt {
		for y := range crt[x] {
			fmt.Printf(crt[x][y])
		}
		fmt.Printf("\n")
	}
}

func isInSprite(spritePosition, position int) bool {
	return spritePosition == position ||
		spritePosition+1 == position ||
		spritePosition-1 == position
}

func main() {
	lines := parseFileToLines()
	cycle := 0
	xValue := 1
	signalStrengths := 0
	crt := make([][]string, 6)

	for i := range crt {
		crt[i] = make([]string, 40)
		for j := range crt[i] {
			crt[i][j] = "."
		}
	}

	for _, line := range lines {
		parts := strings.Split(line, " ")
		instruction := parts[0]

		if instruction == "noop" {
			cycle++
			if isInterestingCycle(cycle) {
				signalStrengths += (cycle * xValue)
			}
		}

		if instruction == "addx" {
			value, _ := strconv.Atoi(parts[1])
			for i := 0; i < 2; i++ {
				cycle++
				if isInterestingCycle(cycle) {
					signalStrengths += (cycle * xValue)
				}
				if i == 1 {
					xValue += value
				}
			}
		}

	}

	fmt.Printf("Part one: %v\n", signalStrengths)
	fmt.Println("Part two:")
	printCrt(crt)
}
