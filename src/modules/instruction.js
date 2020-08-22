import { compTable, destTable, jumpTable } from './tables.js';

export default class Instruction {
  set contents(binary) {
    try {
      if (binary.includes('undefined')) {
        throw new Error('[[SYNTAX ERROR]]');
      }

      this.value = binary;
    } catch (e) {
      console.error('Caught syntax error', e);
      this.value = e;
    }
  }

  constructor(rawInstruction) {
    if (rawInstruction.startsWith('@')) {
      this.handleA(rawInstruction);
    } else {
      this.handleC(rawInstruction);
    }
  }

  handleA(rawInstruction) {
    const address = rawInstruction.substr(1, rawInstruction.length);
    const binary = this.convertToBinary(address);
    this.contents = this.pad(binary);
  }

  handleC(rawInstruction) {
    let compIns;
    let destIns;
    const [destComp, jump] = rawInstruction.split(';');
    const jumpIns = jumpTable[jump ? jump : ''];

    const splitted = destComp.split('=');

    // Only doing a comp instruction
    if (splitted.length === 1) {
      compIns = compTable[splitted[0]];
      destIns = destTable[''];
    // Otherwise is dest/comp instruction
    } else {
      compIns = compTable[splitted[1]];
      destIns = destTable[splitted[0]];
    }

    this.contents = `111${compIns}${destIns}${jumpIns}`;
  }

  pad(instruction) {
    return instruction.padStart(16, '0');
  }

  convertToBinary(number) {
    return (number >>> 0).toString(2);
  }
}