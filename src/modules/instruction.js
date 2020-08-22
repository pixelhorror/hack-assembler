import { compTable, destTable, jumpTable } from './tables.js';

export default class Instruction {
  rawValue = undefined;
  isAInstruction = false;

  get isA() {
    return this.isAInstruction;
  }

  get isC() {
    return !this.isA;
  }

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

  compute() {
    if (this.isA) {
      this.handleA(this.rawValue);
    } else {
      this.handleC(this.rawValue);
    }
  }

  getSymbolValue() {
    return this.rawValue.substr(1, this.rawValue.length);
  }

  handleA(rawValue) {
    let address = rawValue.substr(1, rawValue.length);
    const binary = this.convertToBinary(address);
    this.contents = this.pad(binary);
  }

  hasSymbol() {
    const value = this.rawValue.substring(1, this.rawValue.length);
    return isNaN(Number(value)) && this.isA;
  }

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

  pad(instruction) {
    return instruction.padStart(16, '0');
  }

  convertToBinary(number) {
    return (number >>> 0).toString(2);
  }
}