package main

import (
	"bufio"
	"fmt"
	"os"
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

const ROCK = "A"
const PAPER = "B"
const SCISSORS = "C"

func getItemScore(item string) int {
	if item == ROCK {
		return 1
	}

	if item == PAPER {
		return 2
	}

	if item == SCISSORS {
		return 3
	}

	return 0
}

func convert(input string) string {
	if input == "X" {
		return ROCK
	}

	if input == "Y" {
		return PAPER
	}

	return SCISSORS
}

func isWin(a string, b string) bool {
	return a == ROCK && b == SCISSORS || a == SCISSORS && b == PAPER || a == PAPER && b == ROCK
}

func getLosingItem(item string) string {
	if item == PAPER {
		return ROCK
	}

	if item == ROCK {
		return SCISSORS
	}

	return PAPER
}

func getWinningItem(item string) string {
	if item == ROCK {
		return PAPER
	}

	if item == SCISSORS {
		return ROCK
	}

	return SCISSORS
}

func main() {
	lines := parseFileToLines()

	var totalScore int = 0

	for _, line := range lines {
		parts := strings.Split(line, " ")
		theirChoice := parts[0]
		myChoice := convert(parts[1])

		if myChoice == theirChoice {
			totalScore += (3 + getItemScore(myChoice))
		} else if isWin(myChoice, theirChoice) {
			totalScore += (6 + getItemScore(myChoice))
		} else {
			totalScore += getItemScore(myChoice)
		}
	}

	fmt.Printf("Part one: %v", totalScore)

	totalScore = 0

	for _, line := range lines {
		parts := strings.Split(line, " ")
		theirChoice := parts[0]
		outcome := parts[1]

		if outcome == "X" {
			totalScore += (0 + getItemScore(getLosingItem(theirChoice)))
		}

		if outcome == "Y" {
			totalScore += (3 + getItemScore(theirChoice))
		}

		if outcome == "Z" {
			totalScore += (6 + getItemScore(getWinningItem(theirChoice)))
		}
	}

	fmt.Printf("Part two: %v", totalScore)
}
