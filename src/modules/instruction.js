import { compTable, destTable, jumpTable } from './tables.js';

export default class Instruction {
  rawValue = undefined;
  isAInstruction = false;

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

  constructor(rawValue) {
    this.rawValue = rawValue;
    this.isAInstruction = rawValue.startsWith('@') ? true : false;
  }

  /**
   * Processes raw data into a proper instruction
   */
  compute() {
    if (this.isA()) {
      this.handleA(this.rawValue);
    } else {
      this.handleC(this.rawValue);
    }
  }

  /**
   * Signals if the current raw data belongs to an A-Instruction
   * @returns boolean
   */
  isA() {
    return this.isAInstruction;
  }

  /**
   * Signals if the current raw data belongs to a C-Instruction
   * @returns boolean
   */
  isC() {
    return !this.isA;
  }

  /**
   * Handles raw data for creating an A-Instruction
   * @param {string} rawValue 
   */
  handleA(rawValue) {
    let address = rawValue.substr(1, rawValue.length);
    const binary = this.convertToBinary(address);
    this.contents = this.pad(binary);
  }

  /**
   * Handles raw data for creating a C-Instruction
   * @param {string} rawValue 
   */
  handleC(rawValue) {
    let compIns;
    let destIns;
    const [destComp, jump] = rawValue.split(';');
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

  /**
   * Pads an instruction with the proper number of 0s
   * @param {string} instruction 
   * @returns string
   */
  pad(instruction) {
    return instruction.padStart(16, '0');
  }

  /**
   * Converts to binary
   * @param {number} number 
   * @returns string
   */
  convertToBinary(number) {
    return (number >>> 0).toString(2);
  }
}
