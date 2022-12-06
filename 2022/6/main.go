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

func contains(stack []rune, needle rune) bool {
	for _, c := range stack {
		if c == needle {
			return true
		}
	}

	return false
}

func detectSequence(stack string, sequenceLength int) int {
	count := 0
	var characters []rune
	for _, c := range stack {
		if contains(characters, c) {
			characters = nil
		} else {
			characters = append(characters, c)
		}

		if len(characters) == sequenceLength {
			break
		}

		count++
	}
	return count
}

func main() {
	lines := parseFileToLines()
	line := lines[0]
	fmt.Printf("Part one: %v\n", detectSequence(line, 4))
	fmt.Printf("Part two: %v\n", detectSequence(line, 14))
}
