const fs = require('fs')

const input = fs.readFileSync(process.argv[2]).toString()

const parseInstructions = input =>
  input.trim().split('\n').map(line => {
    const parts = line.split(' ')

    return {
      register: parts[0],
      instruction: parts[1],
      value: parseInt(parts[2]),
      comparisonRegister: parts[4],
      comparisonOperator: parts[5],
      comparisonConstant: parseInt(parts[6]),
    }
  })

const getRegistersFromInstructions = instructions =>
  instructions.reduce((registers, instruction) => {
    registers[instruction.register] = 0
    registers[instruction.comparisonRegister] = 0
    return registers
  }, {})

const registerInstructions = {
  inc: (a, b) => a + b,
  dec: (a, b) => a - b
}

const conditions = {
  '>': (a, b) => a > b,
  '<': (a, b) => a < b,
  '>=': (a, b) => a >= b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b
}

let largestInProcess = 0;

const processInstructions = (instructions, initialRegisters) =>
  instructions.reduce((registers, instruction) => {
    const instructionRegister = registers[instruction.register]
    const registerInstruction = registerInstructions[instruction.instruction]

    if (conditions[instruction.comparisonOperator](registers[instruction.comparisonRegister], instruction.comparisonConstant)) {
      registers[instruction.register] = registerInstruction(instructionRegister, instruction.value)
    }

    if (registers[instruction.register] > largestInProcess) {
      largestInProcess = registers[instruction.register]
    }

    return registers
  }, initialRegisters)

const largestRegisterValue = registers =>
  Object.keys(registers).reduce((largest, registerKey) => {
    if (registers[registerKey] > largest) {
      largest = registers[registerKey]
    }
    return largest
  }, 0)

const instructions = parseInstructions(input)
const registers = processInstructions(instructions, getRegistersFromInstructions(instructions))

console.log(`Largest register value after processing: ${ largestRegisterValue(registers) }`)
console.log(`Largest value held during processing: ${ largestInProcess }`)
