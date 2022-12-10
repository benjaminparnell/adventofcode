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

type point struct {
	x, y int
}

func (p *point) toString() string {
	return strconv.Itoa(p.x) + "," + strconv.Itoa(p.y)
}

func (p *point) reset() {
	p.x = 0
	p.y = 0
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}

	return x
}

func isTouching(a, b point) bool {
	xDiff := Abs(a.x - b.x)
	yDiff := Abs(a.y - b.y)
	return xDiff <= 1 && yDiff <= 1
}

func main() {
	lines := parseFileToLines()

	head := point{0, 0}
	tail := point{0, 0}
	positions := make(map[string]bool)

	for _, line := range lines {
		parts := strings.Split(line, " ")
		direction := parts[0]
		amount, _ := strconv.Atoi(parts[1])

		for i := 1; i <= amount; i++ {

			previousHeadX := head.x
			previousHeadY := head.y

			switch direction {
			case "L":
				head.x--
			case "R":
				head.x++
			case "U":
				head.y++
			case "D":
				head.y--
			}

			if !isTouching(head, tail) {
				tail.x = previousHeadX
				tail.y = previousHeadY
			}

			positions[tail.toString()] = true
		}

	}

	fmt.Printf("Part one: %v\n", len(positions))

	head.reset()
	tail.reset()
	snake := make([]point, 10)

	for i := range snake {
		snake[i] = point{0, 0}
	}

	positions = make(map[string]bool)

	for _, line := range lines {
		parts := strings.Split(line, " ")
		direction := parts[0]
		amount, _ := strconv.Atoi(parts[1])

		for i := 0; i < amount; i++ {
			switch direction {
			case "L":
				snake[0].x--
			case "R":
				snake[0].x++
			case "U":
				snake[0].y++
			case "D":
				snake[0].y--
			}

			for j := 1; j < len(snake); j++ {
				head, tail := snake[j], snake[j-1]

				if !isTouching(tail, head) {
					xDiff := head.x - tail.x
					yDiff := head.y - tail.y

					if xDiff > 0 {
						head.x--
					} else if xDiff < 0 {
						head.x++
					}

					if yDiff > 0 {
						head.y--
					} else if yDiff < 0 {
						head.y++
					}

					snake[j] = head
				}
			}

			positions[snake[9].toString()] = true
		}
	}

	fmt.Printf("Part two: %v\n", len(positions))
}
