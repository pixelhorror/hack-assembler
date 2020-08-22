const compTable = [
  { instruction: '0', value: '0101010' },
  { instruction: '1', value: '0111111' },
  { instruction: '-1', value: '0111010' },
  { instruction: 'D', value: '0001100' },
  { instruction: 'A', value: '0110000' },
  { instruction: 'M', value: '1110000' },
  { instruction: '!D', value: '0001100' },
  { instruction: '!A', value: '0110001' },
  { instruction: '!M', value: '1110001' },
  { instruction: '-D', value: '0001111' },
  { instruction: '-A', value: '0110011' },
  { instruction: '-M', value: '1110011' },
  { instruction: 'D+1', value: '0011111' },
  { instruction: 'A+1', value: '0110111' },
  { instruction: 'M+1', value: '1110111' },
  { instruction: 'D-1', value: '0001110' },
  { instruction: 'A-1', value: '0110010' },
  { instruction: 'M-1', value: '1110010' },
  { instruction: 'D+A', value: '0000010' },
  { instruction: 'D+M', value: '1000010' },
  { instruction: 'D-A', value: '0010011' },
  { instruction: 'D-M', value: '1010011' },
  { instruction: 'A-D', value: '0000111' },
  { instruction: 'M-D', value: '1000111' },
  { instruction: 'D&A', value: '0000000' },
  { instruction: 'D&M', value: '1000000' },
  { instruction: 'D|A', value: '0010101' },
  { instruction: 'D|M', value: '1010101' }
 ];
 
 const destTable = [
   { instruction: '', value: '000' },
   { instruction: 'M', value: '001' },
   { instruction: 'D', value: '010' },
   { instruction: 'MD', value: '011' },
   { instruction: 'A', value: '100' },
   { instruction: 'AM', value: '101' },
   { instruction: 'AD', value: '110' },
   { instruction: 'AMD', value: '111'}
 ];
 
 const jumpTable = [
   { instruction: '', value: '000' },
   { instruction: 'JGT', value: '001' },
   { instruction: 'JEQ', value: '010' },
   { instruction: 'JGE', value: '011' },
   { instruction: 'JLT', value: '100' },
   { instruction: 'JNE', value: '101' },
   { instruction: 'JLE', value: '110' },
   { instruction: 'JMP', value: '111' }
 ];

 export { compTable, destTable, jumpTable };