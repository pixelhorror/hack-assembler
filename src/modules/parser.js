import Instruction from './instruction.js';

export default class Parser {
  /**
   * Processes a raw string into a Hack instruction
   * @param {string} code 
   */
  process(code) {
    const lines = code.split('\n');
    let instructions = [];

    for (let i=0; i < lines.length; i++) {
      const line = lines[i].trim();
      const isComment = line.includes('/');
      const isEmpty = line.length <= 1;

      if (isComment || isEmpty) {
        continue;
      }

      const instruction = new Instruction(line);
      instructions.push(instruction.value);
    }

    return instructions.join('\n');
  }
}
