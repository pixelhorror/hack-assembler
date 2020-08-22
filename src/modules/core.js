export default class Core {
  /**
   * Builds the Core bindings, pass the required node names
   * @param {JS Object} nodes 
   */
  constructor(nodes) {
    this.uploadButton = document.querySelector(nodes.uploadButton);
    this.processButton = document.querySelector(nodes.processButton);
    this.sourceTextArea = document.querySelector(nodes.sourceTextArea);
    this.machineTextArea = document.querySelector(nodes.machineTextArea);
    this.downloadLink = document.querySelector(nodes.downloadLink);

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

  /**
   * Handles the process action, triggers an event with the captured data
   */
  handleProcess() {
    const evt = new CustomEvent('requestProcess', { 
      bubbles: true ,
      detail: this.getSource()
    });

    this.processButton.dispatchEvent(evt);
  }

  /**
   * Handles the parsed data, writes into the textarea and writes the downloadble file
   * @param {string} parsed 
   */
  handleParsed(parsed) {
    this.machineTextArea.value = parsed;
    this.writeFile(parsed);
  }

  /**
   * Process the file that was uploaded by writing it into its textarea
   * @param {string} result 
   */
  processFile(result) {
    this.writeToSourceTextArea(result);
  }

  /**
   * Creates a Blob with the recieved data
   * @param {string} string 
   */
  writeFile(string) {
    const file = new Blob([string], { type: 'text/hack'});
    const name = `${this.uploadButton.files[0].name.split('.')[0]}.hack`;

    this.downloadLink.download = name;
    this.downloadLink.href = URL.createObjectURL(file);
  }

  /**
   * Writes to the source textarea
   * @param {string} text 
   */
  writeToSourceTextArea(text) {
    this.sourceTextArea.value = text;
  }

  /**
   * Gets the value of the source textarea
   */
  getSource() {
    return this.sourceTextArea.value;
  }
}