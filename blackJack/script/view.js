/**
 * @class View
 */
export default class View {
  /**
   * @constructor
   */
  constructor() {
    this.deckCanBeReloaded = true;

    this.body = document.getElementById('body');
    this.app = document.getElementById('root');
    this.board = document.getElementById('board');
    this.newDeck = document.getElementById('newDeck');
    this.drawCard = document.getElementById('drawCard');
    this.drawCard.disabled = true;

    // this.newDeck = this.createElement('button', 'button', 'new-deck');
    // this.newDeck.textContent = 'New Deck';

    // this.checkDeckButton = this.createElement('button');
    // this.checkDeckButton.textContent = 'Check first request';

    // this.drawCard = this.createElement('button', 'button', 'draw-card');
    // this.drawCard.textContent = 'Draw card';

    // this.checkCardButton = this.createElement('button');
    // this.checkCardButton.textContent = 'Check fetch card';

    // this.app.append(this.newDeck);
    // this.app.append(this.checkDeckButton);
    // this.app.append(this.drawCard);
    // this.app.append(this.checkCardButton);
    // this.board.append(this.card);
    // this.card = this.createElement('p');
    this.cardImg = this.createElement('img', 'drawedCard');
    this.board.append(this.cardImg);
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
        console.log('deck can be reloaded');
        handler()
          .catch((err) => {
          console.error(err);
        });
        // Disable new deck
        this.deckCanBeReloaded = false;
        this.newDeck.textContent = 'Reload deck';
        this.newDeck.disabled = true;
        this.newDeck.classList.remove('newDeck');
        this.newDeck.classList.add('disabledButton');

        this.drawCard.disabled = false;
        this.drawCard.classList.remove('disabledButton');
        this.drawCard.classList.add('drawCard');
    });
  }

  /**
   * @function
   * @param {*} getCardFromRequest
   */
  bindDrawCard(getCardFromRequest) {
    
    const bindClickAndKeydown = async () => {
      await getCardFromRequest().then((response) => { this.cardImg.src = response.image; })
        .catch((err) => {
          console.error(err);
        });
      this.newDeck.classList.remove('disabledButton');
      this.newDeck.classList.add('newDeck');
      this.newDeck.disabled = false;
      this.deckCanBeReloaded = true;
    };

    // Bind buttons to avoid duplicated code
    this.drawCard.addEventListener('click', bindClickAndKeydown);
    window.addEventListener('keydown', (event) => {
      console.log(window.event);
      if (event.key === 'd') bindClickAndKeydown();
    });
  }
}