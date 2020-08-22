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
   * @returns string[]
   */
  process(code) {
    const codeWithSymbols = this.buildLabels(code);
    let currentAddress = 16;

    const instructions = codeWithSymbols.map((line) => {
      if (this.isSymbol(line)) {
        const address = this.getSymbolValue(line);

        if (symbols[address] === undefined) {
          symbols[address] = currentAddress;
          currentAddress++;
        }

        line = `@${symbols[address]}`;
      }

      const instruction = new Instruction(line);
      instruction.compute();

      return instruction.value;
    });

    return instructions.join('\n');
  }

  /**
   * Builds labels and cleans up code
   * @param {string} code 
   * @returns string[]
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

  /**
   * Signals if the passed line is a symbol
   * @param {string} line 
   * @returns boolean
   */
  isSymbol(line) {
    if (line.startsWith('@')) {
      const value = this.getSymbolValue(line);
      return isNaN(Number(value));
    } else {
      return false;
    }
  }

  /**
   * Returns the string value of a symbol (removes the @)
   * @param {string} line 
   * @returns string
   */
  getSymbolValue(line) {
    return line.substring(1, line.length);
  }
}
