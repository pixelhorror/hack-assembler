import Core from './modules/core.js';
import Parser from './modules/parser.js';

const parser = new Parser();

const core = new Core({
  uploadButton: '#source-upload',
  processButton: '#process',
  sourceTextArea: '#source',
  machineTextArea: '#machine',
  downloadLink: '#download'
});

document.addEventListener('requestProcess', (rawData) => {
  const binary = parser.process(rawData.detail);
  core.handleParsed(binary);
});