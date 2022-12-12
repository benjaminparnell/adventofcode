package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
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

type pathItem struct {
	x, y, length int
}

func hasVisited(visited map[string]int, x, y int) bool {
	coord := toCoord(x, y)
	_, hasVisited := visited[coord]
	return hasVisited
}

func getNeighbours(x, y, maxX, maxY int, visited map[string]int) [][]int {
	var neighbours [][]int

	// Left
	if x-1 >= 0 && !hasVisited(visited, x-1, y) {
		neighbours = append(neighbours, []int{x - 1, y})
	}

	// Up
	if y-1 >= 0 && !hasVisited(visited, x, y-1) {
		neighbours = append(neighbours, []int{x, y - 1})
	}

	// Right
	if x+1 < maxX && !hasVisited(visited, x+1, y) {
		neighbours = append(neighbours, []int{x + 1, y})
	}

	// Down
	if y+1 < maxY && !hasVisited(visited, x, y+1) {
		neighbours = append(neighbours, []int{x, y + 1})
	}

	return neighbours
}

func isLower(src, dest rune) bool {
	if src == 'S' {
		return isLower('a', dest)
	}

	if src == 'E' {
		return isLower('z', dest)
	}

	if dest == 'S' {
		return isLower(src, 'a')
	}

	if dest == 'E' {
		return isLower(src, 'z')
	}

	return dest-src <= 1
}

func toCoord(x, y int) string {
	return strconv.Itoa(x) + "," + strconv.Itoa(y)
}

func main() {
	lines := parseFileToLines()
	result := 0
	startX := 0
	startY := 0

	grid := make([][]rune, len(lines))
	for i, line := range lines {
		grid[i] = make([]rune, len(line))
		for j, character := range line {
			grid[i][j] = character
			if character == 'S' {
				startX = j
				startY = i
			}
		}
	}

	startCoord := toCoord(startX, startY)
	visited := map[string]int{startCoord: 0}
	var stack []pathItem = []pathItem{{x: startX, y: startY, length: 0}}

	for len(stack) > 0 {
		var newStack []pathItem
		for _, item := range stack {
			x, y, length := item.x, item.y, item.length
			neighbours := getNeighbours(x, y, len(grid[0]), len(grid), visited)
			value := grid[y][x]

			if value == 'E' && (length < result || result == 0) {
				result = length
				continue
			}

			for _, neighbour := range neighbours {
				neighbourX, neighbourY := neighbour[0], neighbour[1]
				neighbourValue := grid[neighbourY][neighbourX]
				coord := toCoord(neighbourX, neighbourY)
				if isLower(value, neighbourValue) {
					visited[coord] = 1
					newStack = append(newStack, pathItem{x: neighbourX, y: neighbourY, length: length + 1})
				}
			}
		}

		stack = newStack
	}

	fmt.Printf("Part one: %v\n", result)
}
