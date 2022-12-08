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

func onEdge(x, y, boundX, boundY int) bool {
	return (x == 0 || x == boundX-1) || (y == 0 || y == boundY-1)
}

func main() {
	lines := parseFileToLines()
	var forest [][]int

	for _, line := range lines {
		var trees []int

		for _, character := range line {
			number, _ := strconv.Atoi(string(character))
			trees = append(trees, number)
		}

		forest = append(forest, trees)
	}

	visibleTrees := 0
	highestScenicScore := 0
	boundY := len(forest)
	boundX := len(forest[0])

	for y := 0; y < boundY; y++ {
		for x := 0; x < boundX; x++ {
			currentTree := forest[y][x]
			if onEdge(x, y, boundX, boundY) {
				visibleTrees++
				continue
			}

			visibleRight := true
			rightScore := 0
			for i := x + 1; i < boundX; i++ {
				rightScore = i - x
				if forest[y][i] >= currentTree {
					visibleRight = false
					break
				}
			}

			visibleLeft := true
			leftScore := 0
			for i := x - 1; i >= 0; i-- {
				leftScore = x - i
				if forest[y][i] >= currentTree {
					visibleLeft = false
					break
				}
			}

			visibleUp := true
			upScore := 0
			for i := y - 1; i >= 0; i-- {
				upScore = y - i
				if forest[i][x] >= currentTree {
					visibleUp = false
					break
				}
			}

			visibleDown := true
			downScore := 0
			for i := y + 1; i < boundY; i++ {
				downScore = i - y
				if forest[i][x] >= currentTree {
					visibleDown = false
					break
				}
			}

			scenicScore := upScore * downScore * rightScore * leftScore

			if scenicScore > highestScenicScore {
				highestScenicScore = scenicScore
			}

			if visibleRight || visibleLeft || visibleUp || visibleDown {
				visibleTrees++
			}
		}
	}

	fmt.Printf("Part one: %v\n", visibleTrees)
	fmt.Printf("Part two: %v\n", highestScenicScore)
}
