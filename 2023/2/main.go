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

type game struct {
	id, red, green, blue int
}

func parseToGame(line string) game {
	parts := strings.Split(line, ":")
	gameIdString := strings.Split(parts[0], " ")[1]
	gameId, _ := strconv.Atoi(gameIdString)
	roundStrings := strings.Split(parts[1], "; ")
	red := 0
	green := 0
	blue := 0

	for _, roundString := range roundStrings {
		roundResults := strings.Split(roundString, ", ")
		for _, result := range roundResults {
			resultParts := strings.Split(strings.Trim(result, " "), " ")
			numberString, colour := resultParts[0], resultParts[1]
			number, _ := strconv.Atoi(numberString)
			if colour == "green" && number > green {
				green = number
			}
			if colour == "blue" && number > blue {
				blue = number
			}
			if colour == "red" && number > red {
				red = number
			}
		}
	}

	return game{gameId, red, green, blue}
}

func main() {
	lines := parseFileToLines()

	partOne := 0
	partTwo := 0

	for _, line := range lines {
		game := parseToGame(line)

		if game.red <= 12 && game.green <= 13 && game.blue <= 14 {
			partOne += game.id
		}

		partTwo += (game.red * game.green * game.blue)
	}

	fmt.Printf("Part one: %v\n", partOne)
	fmt.Printf("Part two: %v\n", partTwo)
}
