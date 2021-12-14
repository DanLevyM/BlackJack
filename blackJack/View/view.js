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

    this.drawCard = this.createElement('button');
    this.drawCard.textContent = 'Draw card';

    this.checkCardButton = this.createElement('button');
    this.checkCardButton.textContent = 'Check fetch card';

    this.card = this.createElement('p');

    this.app.append(this.newDeck);
    this.app.append(this.checkDeckButton);
    this.app.append(this.drawCard);
    this.app.append(this.checkCardButton);
    this.app.append(this.card);
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

  /**
   * @function
   * @param {*} getCardFromRequest
   * @param {*} getCardFromModel
   */
  bindDrawCard(getCardFromRequest, getCardFromModel) {
    this.drawCard.addEventListener('click', async (event) => {
      event.preventDefault();
      await getCardFromRequest();
      const cardDrawed = await getCardFromModel();
      console.log('card drawed', cardDrawed);
      // this.card.textContent = `${cardDrawed.value}`;
      // this.app.append(this.card);
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

  /**
   * @function
   * @param {*} handler
   */
  bindCheckCardButton(handler) {
    this.checkCardButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  }
}
