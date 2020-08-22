import Core from './modules/core.js';
import Parser from './modules/parser.js';

const uploadButton = document.querySelector('#source-upload');
const processButton = document.querySelector('#process');
const sourceTextArea = document.querySelector('#source');
const machineTextArea = document.querySelector('#machine');
const downloadLink = document.querySelector('#download');

const parser = new Parser();
const core = new Core(uploadButton, processButton, sourceTextArea, machineTextArea, downloadLink, parser);