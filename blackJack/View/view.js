/**
 * @class View
 */
export default class View {
  /**
   * @constructor
   */
  constructor() {
    this.body = document.getElementById('body');
    this.app = document.getElementById('root');
    this.newDeck = this.createElement('button');
    this.newDeck.textContent = 'New Deck';
    this.checkDeckButton = this.createElement('button');
    this.checkDeckButton.textContent = 'Check first request';
    this.app.append(this.newDeck);
    this.app.append(this.checkDeckButton);
  }

  /**
   * @function
   * @param {string} tag
   * @param {string} className
   * @return {HTMLElement} elem
   */
  createElement(tag, className) {
    const elem = document.createElement(tag);

    if (className) elem.classList.add(className);
    return elem;
  }

  /**
   * @function
   * @param {*} handler
   */
  bindNewDeck(handler) {
    this.newDeck.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }


  // -------------------------------------------------------
  // ---------------------TESTING --------------------------
  // -------------------------------------------------------

  /**
   * @function
   * @param {*} handler
   */
  bindCheckDeckButton(handler) {
    this.checkDeckButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }
}
