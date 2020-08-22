export default class Core {
  constructor(
    uploadButton,
    processButton,
    sourceTextArea,
    machineTextArea,
    downloadLink,
    parser
  ) {
    this.uploadButton = uploadButton;
    this.processButton = processButton;
    this.sourceTextArea = sourceTextArea;
    this.machineTextArea = machineTextArea;
    this.downloadLink = downloadLink;

    this.parser = parser;
    this.rawSource = null;

    this.bindEvents();
  }

  /**
   * Binds all the actions events
   */
  bindEvents() {
    this.uploadButton.addEventListener('change', () => this.handleFile());
    this.processButton.addEventListener('click', () => this.handleProcess());
  }

  /**
   * Handles file upload
   */
  handleFile() {
    let file = this.uploadButton.files[0];

    const reader = new FileReader();

    reader.onload = (progressEvent) => this.processFile(progressEvent.currentTarget.result);
    reader.readAsBinaryString(file);
  }

  handleProcess() {
    const processed = this.parser.process(this.rawSource);
    this.machineTextArea.value = processed;
    this.writeFile(processed);
  }

  processFile(result) {
    this.rawSource = result;
    this.writeToSourceTextArea(result);
  }

  writeFile(string) {
    const file = new Blob([string], { type: 'text/hack'});
    const name = `${this.uploadButton.files[0].name.split('.')[0]}.hack`;

    this.downloadLink.download = name;
    this.downloadLink.href = URL.createObjectURL(file);
  }

  writeToSourceTextArea(text) {
    this.sourceTextArea.value = text;
  }

  getRawSource() {
    return this.rawSource;
  }
}