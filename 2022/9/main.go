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

func isTouching(a, b point) bool {
	// left
	if a.x-1 == b.x && a.y == b.y {
		return true
	}
	// down
	if a.y-1 == b.y && a.x == b.x {
		return true
	}
	// right
	if a.x+1 == b.x && a.y == b.y {
		return true
	}
	// up
	if a.y+1 == b.y && a.x == b.x {
		return true
	}
	// in the same position
	if a.y == b.y && a.x == b.x {
		return true
	}
	// up and right
	if a.y+1 == b.y && a.x+1 == b.x {
		return true
	}
	// up and left
	if a.y+1 == b.y && a.x-1 == b.x {
		return true
	}
	// down and right
	if a.y-1 == b.y && a.x+1 == b.x {
		return true
	}
	// down and left
	if a.y-1 == b.y && a.x-1 == b.x {
		return true
	}

	return false
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
				positions[tail.toString()] = true
			}
		}

	}

	fmt.Printf("Part one: %v\n", len(positions))
}
