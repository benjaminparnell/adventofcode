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

func reverse(slice []string) []string {
	newSlice := make([]string, len(slice))
	copy(newSlice, slice)
	for i, j := 0, len(slice)-1; i < j; i, j = i+1, j-1 {
		newSlice[i], newSlice[j] = newSlice[j], newSlice[i]
	}
	return newSlice
}

func setState(stateLines []string) [][]string {
	state := make([][]string, 9)
	for _, line := range stateLines {
		for index := 0; index <= len(line); index += 4 {
			item := string(line[index+1])
			if item != " " {
				stackPosition := index / 4
				state[stackPosition] = append(state[stackPosition], item)
			}
		}
	}
	return state
}

type instruction struct {
	source      int
	destination int
	amount      int
}

func parseInstructions(lines []string) []instruction {
	var instructions []instruction

	for _, line := range lines {
		parts := strings.Split(line, " ")
		amount, _ := strconv.Atoi(parts[1])
		source, _ := strconv.Atoi(parts[3])
		destination, _ := strconv.Atoi(parts[5])
		source = source - 1
		destination = destination - 1

		instructions = append(instructions, instruction{
			source,
			destination,
			amount,
		})
	}

	return instructions
}

func main() {
	lines := parseFileToLines()
	var stateLines []string
	var instructionLines []string
	stateRead := false

	for _, line := range lines {
		if stateRead {
			instructionLines = append(instructionLines, line)
			continue
		}

		if line == "" && !stateRead {
			stateRead = true
			continue
		}

		stateLines = append(stateLines, line)
	}

	stateLines = stateLines[:len(stateLines)-1]
	state := setState(stateLines)
	instructions := parseInstructions(instructionLines)

	for _, instruction := range instructions {
		sourceStack := state[instruction.source]
		destinationStack := state[instruction.destination]

		// This line will panic if it can't do the slice, which isn't very good is it
		removedItems, newSourceStack := sourceStack[0:instruction.amount], sourceStack[instruction.amount:]
		state[instruction.destination] = append(reverse(removedItems), destinationStack...)
		state[instruction.source] = newSourceStack
	}

	result := ""
	for _, stack := range state {
		result += stack[0]
	}

	fmt.Printf("Part one: %v\n", result)

	state = setState(stateLines)

	for _, instruction := range instructions {
		sourceStack := state[instruction.source]
		destinationStack := state[instruction.destination]

		// This line will panic if it can't do the slice, which isn't very good is it
		removedItems, newSourceStack := sourceStack[0:instruction.amount], sourceStack[instruction.amount:]
		items := make([]string, len(removedItems))
		copy(items, removedItems)
		state[instruction.destination] = append(items, destinationStack...)
		state[instruction.source] = newSourceStack
	}

	result = ""
	for _, stack := range state {
		result += stack[0]
	}

	fmt.Printf("Part two: %v\n", result)
}
