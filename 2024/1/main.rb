def read_file_lines()
    lines = []
    File.open("./input.txt", "r") do |file|
        file.each_line do |line|
            lines.push(line)
        end
    end
    return lines
end

first_list = []
second_list = []
read_file_lines().map do |line|
    pair = line.split(/   /, 2)
    first_list.push(pair[0].to_i)
    second_list.push(pair[1].to_i)
end

first_list = first_list.sort
second_list = second_list.sort
result = 0

first_list.each_with_index do |value, index|
    second_value = second_list[index]
    if value > second_value
        result += (value - second_value)
    elsif value < second_value
        result += (second_value - value)
    end
end

part_two = 0
counts = second_list.tally

first_list.each do |value|
    if counts[value]
        part_two += (value * counts[value])
    end
end

puts result
puts part_two