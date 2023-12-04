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
	var cards []card
	copies := make(map[int]int)
	partOne := 0
	partTwo := 0

	for _, line := range lines {
		cards = append(cards, parseToCard(line))
	}

	for _, card := range cards {
		score := 0

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

	for cardIndex, card := range cards {
		score := 0

		_, ok := copies[card.id]
		if !ok {
			copies[card.id] = 1
		} else {
			copies[card.id]++
		}

		winCounter := 0
		for _, number := range card.numbers {
			if slices.Contains(card.winningNumbers, number) {
				winCounter++
			}
		}

		for index := 0; index < copies[card.id]; index++ {
			for winIndex := cardIndex + 1; winIndex <= cardIndex+winCounter; winIndex++ {
				cardId := cards[winIndex].id
				_, ok := copies[cardId]
				if !ok {
					copies[cardId] = 1
				} else {
					copies[cardId]++
				}
			}
		}

		partTwo += score
	}

	fmt.Printf("Part one: %v\n", partOne)
	for _, value := range copies {
		partTwo += value
	}
	fmt.Printf("Part two: %v\n", partTwo)
}
