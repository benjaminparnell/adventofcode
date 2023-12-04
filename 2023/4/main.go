package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"slices"
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

type card struct {
	id             int
	numbers        []int
	winningNumbers []int
}

func parseNumberList(input string) []int {
	listsRegex := regexp.MustCompile(`(\d+)`)
	listResult := listsRegex.FindAllString(input, -1)
	var numbers []int
	for _, result := range listResult {
		number, _ := strconv.Atoi(result)
		numbers = append(numbers, number)
	}
	return numbers
}

func parseToCard(cardInput string) card {
	idRegex := regexp.MustCompile(`(\d+):`)
	idResult := idRegex.FindAllString(cardInput, -1)
	id, _ := strconv.Atoi(strings.TrimRight(idResult[0], ":"))
	numbersPart := strings.Split(strings.Split(cardInput, ":")[1], "|")
	winningNumbers := parseNumberList(numbersPart[0])
	numbers := parseNumberList(numbersPart[1])

	return card{id, numbers, winningNumbers}
}

func main() {
	lines := parseFileToLines()

	partOne := 0
	for _, line := range lines {
		score := 0
		card := parseToCard(line)

		for _, number := range card.numbers {
			if slices.Contains(card.winningNumbers, number) {
				if score == 0 {
					score = 1
				} else {
					score *= 2
				}
			}
		}

		partOne += score
	}

	fmt.Printf("Part one: %v\n", partOne)
}
