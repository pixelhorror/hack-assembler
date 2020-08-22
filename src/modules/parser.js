import { compTable, destTable, jumpTable } from './tables.js';

export default class Parser {
  process(code) {
    const lines = code.split('\n');
    let processed = [];

    for (let i=0; i < lines.length; i++) {
      const line = lines[i];
      const isComment = line.includes('/');
      const isEmpty = line.trim().length === 1 || line.trim().length === 0;

      if (isComment || isEmpty) {
        continue;
      }

      if (line.startsWith('@')) {
        processed.push(this.processAInstruction(line));
      } else {
        let compIns;
        let destIns;
        const [destComp, jump] = line.split(';');
        const jumpIns = this.getJump(jump);

        const splitted = destComp.split('='); // DEST/COMP

        if (splitted.length === 1) {
          compIns = this.getComp(splitted[0]);
          destIns = this.getDest();
        } else {
          compIns = this.getComp(splitted[1]);
          destIns = this.getDest(splitted[0]);
        }

        const composed = `111${compIns.value}${destIns.value}${jumpIns.value}`;

        processed.push(composed);
      }
    }

    return processed.join('\n');
  }

  processAInstruction(line) {
    const number = line.substr(1, line.length);
    const binary = this.convertToBinary(number);
    return this.pad(binary);
  }

  pad(instruction) {
    return instruction.padStart(16, '0');
  }

  getComp(instruction) {
    return compTable.find(comp => comp.instruction === instruction.trim());
  }

  getJump(instruction = '') {
    return jumpTable.find(jump => jump.instruction === instruction.trim());
  }

  getDest(instruction = '') {
    return destTable.find(des => des.instruction === instruction.trim());
  }

  convertToBinary(number) {
    return (number >>> 0).toString(2);
  }
}
