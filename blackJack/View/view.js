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
    this.newDeck = document.getElementById('new-deck');
    this.drawCard = document.getElementById('draw-card');
    // this.newDeck = this.createElement('button', 'button', 'new-deck');
    // this.newDeck.textContent = 'New Deck';

    // this.checkDeckButton = this.createElement('button');
    // this.checkDeckButton.textContent = 'Check first request';

    // this.drawCard = this.createElement('button', 'button', 'draw-card');
    // this.drawCard.textContent = 'Draw card';

    // this.checkCardButton = this.createElement('button');
    // this.checkCardButton.textContent = 'Check fetch card';

    this.card = this.createElement('p');

    this.cardImg = this.createElement('img');

    // this.app.append(this.newDeck);
    // this.app.append(this.checkDeckButton);
    // this.app.append(this.drawCard);
    // this.app.append(this.checkCardButton);
    this.app.append(this.card);
    this.app.append(this.cardImg);
  }

  /**
   * @function
   * @param {string} tag
   * @param {string} className
   * @param {string} className2
   * @return {HTMLElement} elem
   */
  createElement(tag, className, className2) {
    const elem = document.createElement(tag);

    if (className) elem.classList.add(className);
    if (className2) elem.classList.add(className2);
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

  /**
   * @function
   * @param {*} getCardFromRequest
   */
  bindDrawCard(getCardFromRequest) {
    this.drawCard.addEventListener('click', async (event) => {
      event.preventDefault();
      await getCardFromRequest().then((response) => {
        this.card.textContent = `${response.value} ${response.suit}`;
        this.cardImg.src = response.image;
      });
    });
  }

  // -------------------------------------------------------
  // ---------------------TESTING --------------------------
  // -------------------------------------------------------
  // /**
  //  * @function
  //  * @param {*} handler
  //  */
  // bindCheckDeckButton(handler) {
  //   this.checkDeckButton.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     handler();
  //   });
  // }

  // /**
  //  * @function
  //  * @param {*} handler
  //  */
  // bindCheckCardButton(handler) {
  //   this.checkCardButton.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     handler();
  //   });
  // }
}
