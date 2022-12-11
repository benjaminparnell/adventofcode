package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"sort"
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

type operation struct {
	operandB string
	operandA string
	op       string
}

type test struct {
	number    int
	trueDest  int
	falseDest int
}

type monkey struct {
	items     []float64
	op        operation
	test      test
	inspected int
}

func getOperand(op string, old float64) float64 {
	if op == "old" {
		return old
	}

	num, _ := strconv.Atoi(op)
	return float64(num)
}

func main() {
	lines := parseFileToLines()
	monkeys := make([]monkey, 8)
	currentMonkey := monkey{}
	monkeyIndex := 0

	for i, line := range lines {
		if strings.Contains(line, "Starting items") {
			parts := strings.SplitAfter(line, ": ")
			numbers := strings.Split(parts[1], ", ")
			for _, strNum := range numbers {
				number, _ := strconv.Atoi(strNum)
				currentMonkey.items = append(currentMonkey.items, float64(number))
			}
		}

		if strings.Contains(line, "Operation:") {
			parts := strings.SplitAfter(line, "new = ")
			part := strings.Split(parts[1], " ")
			currentMonkey.op = operation{
				operandA: part[0],
				operandB: part[2],
				op:       part[1],
			}
		}

		if strings.Contains(line, "Test:") {
			parts := strings.Split(line, " ")
			number, _ := strconv.Atoi(parts[len(parts)-1])
			ifTrueParts := strings.Split(lines[i+1], " ")
			ifFalseParts := strings.Split(lines[i+2], " ")
			trueDest, _ := strconv.Atoi(ifTrueParts[len(ifTrueParts)-1])
			falseDest, _ := strconv.Atoi(ifFalseParts[len(ifFalseParts)-1])
			currentMonkey.test = test{
				number:    number,
				trueDest:  trueDest,
				falseDest: falseDest,
			}
		}

		if line == "" || i+1 == len(lines) {
			monkeys[monkeyIndex] = currentMonkey
			currentMonkey = monkey{}
			monkeyIndex++
		}
	}

	rounds := 20

	for i := 0; i < rounds; i++ {
		for monkeyIndex, monkey := range monkeys {
			for _, item := range monkey.items {
				monkey.inspected++
				var worryLevel float64 = item
				switch monkey.op.op {
				case "+":
					worryLevel += getOperand(monkey.op.operandB, worryLevel)
					worryLevel = math.Floor(float64(worryLevel) / 3)
				case "*":
					worryLevel *= getOperand(monkey.op.operandB, worryLevel)
					worryLevel = math.Floor(float64(worryLevel) / 3)
				}

				newItems := make([]float64, len(monkey.items)-1)
				slice := monkey.items[1:]
				copy(newItems, slice)
				monkey.items = newItems
				monkeys[monkeyIndex] = monkey

				if int64(worryLevel)%int64(monkey.test.number) == 0 {
					monkeys[monkey.test.trueDest].items = append(monkeys[monkey.test.trueDest].items, worryLevel)
				} else {
					monkeys[monkey.test.falseDest].items = append(monkeys[monkey.test.falseDest].items, worryLevel)
				}
			}
		}

		// fmt.Printf("Round %v\n", i+1)
		// for i, monkey := range monkeys {
		// 	fmt.Println(i, monkey.items)
		// }
		// fmt.Println()
	}

	sort.Slice(monkeys, func(i, j int) bool {
		return monkeys[i].inspected > monkeys[j].inspected
	})

	fmt.Printf("Part one: %v\n", monkeys[0].inspected*monkeys[1].inspected)
}
