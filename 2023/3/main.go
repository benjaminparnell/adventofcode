package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"unicode"
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

func isSymbol(engine []string, x int, y int) bool {
	item := engine[y][x]
	if unicode.IsDigit(rune(item)) || string(item) == "." {
		return false
	}
	return true
}

func main() {
	lines := parseFileToLines()
	partOne := 0
	partTwo := 0

	for y, line := range lines {
		currentNumber := ""
		for x, char := range line {
			if unicode.IsDigit(char) {
				currentNumber += string(char)
			}

			if len(currentNumber) != 0 && (x+1 > len(line)-1 || !unicode.IsDigit(rune(line[x+1]))) {
				var symbols []string
				startX := x - len(currentNumber)
				number, _ := strconv.Atoi(currentNumber)

				for i := x; i > startX; i-- {
					if y-1 > -1 && isSymbol(lines, i, y-1) {
						symbols = append(symbols, string(lines[y-1][i]))
					}

					if y+1 < (len(lines)-1) && isSymbol(lines, i, y+1) {
						symbols = append(symbols, string(lines[y+1][i]))
					}
				}

				if startX > -1 {
					if isSymbol(lines, startX, y) {
						symbols = append(symbols, string(lines[y][startX]))

					}

					if y+1 < (len(lines)-1) && isSymbol(lines, startX, y+1) {
						symbols = append(symbols, string(lines[y+1][startX]))
					}

					if y-1 > -1 && isSymbol(lines, startX, y-1) {
						symbols = append(symbols, string(lines[y-1][startX]))
					}
				}

				if x+1 < len(line)-1 {
					if isSymbol(lines, x+1, y) {
						symbols = append(symbols, string(lines[y][x+1]))
					}

					if y+1 < (len(lines)-1) && isSymbol(lines, x+1, y+1) {
						symbols = append(symbols, string(lines[y+1][x+1]))
					}

					if y-1 > -1 && isSymbol(lines, x+1, y-1) {
						symbols = append(symbols, string(lines[y-1][x+1]))
					}
				}

				if len(symbols) != 0 {
					partOne += number
				}

				currentNumber = ""
			}
		}
	}

	fmt.Printf("Part one: %v\n", partOne)
	fmt.Printf("Part two: %v\n", partTwo)
}
