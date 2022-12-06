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

func allDifferent(characters []rune) bool {
	var newCharacters []rune

	for _, c := range characters {
		if contains(newCharacters, c) {
			return false
		}
		newCharacters = append(newCharacters, c)
	}

	return true
}

func detectSequence(stack string, sequenceLength int) int {
	count := 0
	var characters []rune
	for _, c := range stack {
		if len(characters) == sequenceLength && allDifferent(characters) {
			break
		} else if len(characters) == sequenceLength {
			newSlice := make([]rune, sequenceLength-1)
			copy(newSlice, characters[1:])
			characters = newSlice
		}

		count++
		characters = append(characters, c)
	}
	return count
}

func main() {
	lines := parseFileToLines()
	line := lines[0]
	fmt.Printf("Part one: %v\n", detectSequence(line, 4))
	fmt.Printf("Part two: %v\n", detectSequence(line, 14))
}
