import Instruction from './instruction.js';

const symbols = {
  'SP': 0,
  'LCL': 1,
  'ARG': 2,
  'THIS': 3,
  'THAT': 4,
  'R0': 0,
  'R1': 1,
  'R2': 2,
  'R3': 3,
  'R4': 4,
  'R5': 5,
  'R6': 6,
  'R7': 7,
  'R8': 8,
  'R9': 9,
  'R10': 10,
  'R11': 11,
  'R12': 12,
  'R13': 13,
  'R14': 14,
  'R15': 15,
  'SCREEN': 16384,
  'KBD': 24576
};

export default class Parser {
  /**
   * Processes a raw string into a Hack instruction
   * @param {string} code 
   */
  process(code) {
    const codeWithSymbols = this.buildLabels(code);
    let instructions = [];
    let currentAddress = 16;

    for (let i=0; i < codeWithSymbols.length; i++) {
      const instruction = new Instruction(codeWithSymbols[i]);

      if (instruction.hasSymbol()) {
        const address = instruction.getSymbolValue();

        if (symbols[address] === undefined) {
          symbols[address] = currentAddress;
          currentAddress++;
        }

        instruction.rawValue = `@${symbols[address]}`;
      }

      instruction.compute();

      instructions.push(instruction.value);
    }

    return instructions.join('\n');
  }

  /**
   * Builds labels and cleans up code
   * @param {string} code 
   */
  buildLabels(code) {
    const lines = code.split('\n');
    let rawInstructions = [];
    let lineNumber = 0;

    for (let i=0; i < lines.length; i++) {
      const line = lines[i].trim();
      const isComment = line.startsWith('/');
      const isEmpty = line.length <= 1;

      if (isComment || isEmpty) {
        continue;
      }

      const codeLine = line.split('//')[0].trim();

      if (codeLine.startsWith('(')) {
        const label = codeLine.substring(1, codeLine.length - 1);
        symbols[label] = lineNumber;
      } else {
        lineNumber++;
        rawInstructions.push(codeLine);
      }
    }

    return rawInstructions;
  }
}
