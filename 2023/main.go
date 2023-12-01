package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"unicode"
)

func parseFileToLines() []string {
	file, err := os.Open("test.txt")

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

func sumLineValues(lines []string) int {
	var sum int

	for _, line := range lines {
		var digits []string
		for _, character := range line {
			if unicode.IsDigit(character) {
				digits = append(digits, string(character))
			}
		}
		total, err := strconv.Atoi(digits[0] + digits[len(digits)-1])
		if err == nil {
			sum += total
		}
	}

	return sum
}

func numberOrString(input string) string {
	numberMap := map[string]string{
		"one":   "1",
		"two":   "2",
		"three": "3",
		"four":  "4",
		"five":  "5",
		"six":   "6",
		"seven": "7",
		"eight": "8",
		"nine":  "9",
	}
	var output string
	if _, err := strconv.Atoi(input); err == nil {
		output = input
	} else {
		output = numberMap[input]
	}
	return output
}

func sumLineValuesWithLetters(lines []string) int {
	var sum int
	re := regexp.MustCompile(`(1|2|3|4|5|6|7|8|9|one|two|three|four|five|six|seven|eight|nine)`)

	for _, line := range lines {
		matches := re.FindAllString(line, -1)
		first, last := numberOrString(matches[0]), numberOrString(matches[len(matches)-1])
		total, err := strconv.Atoi(first + last)
		if err == nil {
			sum += total
		}
	}

	return sum
}

func main() {
	lines := parseFileToLines()
	fmt.Printf("Part one: %v\n", sumLineValues(lines))
	fmt.Printf("Part two: %v\n", sumLineValuesWithLetters(lines))
}
