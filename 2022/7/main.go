package main

import (
	"bufio"
	"fmt"
	"os"
	"path"
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

type node struct {
	path     string
	name     string
	parent   string
	children []node
	nodeType string
	size     int
}

func isInstruction(line string) bool {
	return line[0] == '$'
}

func isFile(line string) bool {
	return strings.Split(line, " ")[0] != "dir"
}

func isDir(line string) bool {
	return strings.Split(line, " ")[0] == "dir"
}

func noDirectories(foundNode node) bool {
	for _, child := range foundNode.children {
		if child.nodeType == "dir" {
			return false
		}
	}
	return true
}

func count(tree map[string]node, start string) int {
	foundNode, _ := tree[start]
	dirSize := 0

	for _, child := range foundNode.children {
		if child.nodeType == "file" {
			dirSize += child.size
		}

		if child.nodeType == "dir" {
			dirSize += count(tree, path.Join(foundNode.path, child.name))
		}
	}

	return dirSize
}

func traverse(tree map[string]node, start string) int {
	foundNode, _ := tree[start]
	dirSize := 0
	sizeCount := 0

	for _, child := range foundNode.children {
		if child.nodeType == "file" {
			dirSize += child.size
		}

		if child.nodeType == "dir" {
			dirSize += count(tree, path.Join(foundNode.path, child.name))
			sizeCount += traverse(tree, path.Join(foundNode.path, child.name))
		}
	}

	if dirSize <= 100_000 {
		sizeCount += dirSize
	}

	return sizeCount
}

func traverseTwo(tree map[string]node, start string) {
	foundNode, _ := tree[start]
	dirSize := 0

	for _, child := range foundNode.children {
		if child.nodeType == "file" {
			dirSize += child.size
		}

		if child.nodeType == "dir" {
			dirSize += count(tree, path.Join(foundNode.path, child.name))
			traverseTwo(tree, path.Join(foundNode.path, child.name))
		}
	}

	if dirSize >= 8748071 {
		fmt.Println(dirSize)
	}
}

func main() {
	lines := parseFileToLines()
	tree := make(map[string]node)

	currentPath := ""
	currentInstruction := ""
	currentArgument := ""

	for _, line := range lines {
		if isInstruction(line) {
			parts := strings.Split(line, " ")
			currentInstruction = parts[1]

			if currentInstruction == "cd" {
				currentArgument = parts[2]

				if currentArgument == "/" {
					currentPath = "/"
				} else if currentArgument == ".." {
					currentPath = path.Dir(currentPath)
				} else {
					currentPath = path.Join(currentPath, currentArgument)
				}

				if _, ok := tree[currentPath]; !ok {
					var children []node
					tree[currentPath] = node{
						nodeType: "dir",
						path:     currentPath,
						name:     currentArgument,
						parent:   path.Dir(currentPath),
						children: children,
					}
				}
			}
		} else {
			// its output
			if currentInstruction == "ls" {
				if isFile(line) {
					parts := strings.Split(line, " ")
					name := parts[1]
					size, _ := strconv.Atoi(parts[0])

					if foundNode, ok := tree[currentPath]; ok {

						foundNode.children = append(foundNode.children, node{
							nodeType: "file",
							name:     name,
							size:     size,
						})

						tree[currentPath] = foundNode
					}
				}

				if isDir(line) {
					parts := strings.Split(line, " ")
					name := parts[1]

					if foundNode, ok := tree[currentPath]; ok {

						foundNode.children = append(foundNode.children, node{
							nodeType: "dir",
							name:     name,
						})

						tree[currentPath] = foundNode
					}
				}
			}
		}
	}

	fmt.Printf("Part one: %v\n", traverse(tree, "/"))
	traverseTwo(tree, "/")
}
