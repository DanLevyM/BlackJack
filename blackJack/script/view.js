/* eslint-disable max-len */
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
    this.left = document.getElementById('left');
    this.remainingCards = document.getElementById('cardsRemaining');
    this.dealerScore = document.getElementById('dealerScore');
    this.playerScore = document.getElementById('playerScore');
    this.board = document.getElementById('board');
    this.newDeck = document.getElementById('newDeck');
    this.drawCard = document.getElementById('drawCard');
    this.shuffleDeck = document.getElementById('shuffleDeck');
    this.drawCard.disabled = true;
    this.shuffleDeck.disabled = true;

    this.dealerCard = this.createElement('img', 'drawedCard');
    this.playerCard = this.createElement('img', 'drawedCard');
    this.board.append(this.dealerCard);
    this.board.append(this.playerCard);
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
   * @description Get new deck
   * @function
   * @param {function} handler
   * @param {object} game
   */
  bindNewDeck(handler, game) {
    this.newDeck.addEventListener('click', () => {
      console.log('deck is reloaded');
      handler()
          .catch((err) => {
            console.error(err);
          });

      // Disable new deck
      this.deckCanBeReloaded = false;
      this.newDeck.textContent = 'New game';
      this.newDeck.disabled = true;
      this.newDeck.classList.remove('newDeck');
      this.newDeck.classList.add('disabledButton');

      // Enable new card
      this.drawCard.disabled = false;
      this.drawCard.classList.remove('disabledButton');
      this.drawCard.classList.add('drawCard');

      // Enable shuffle deck
      this.shuffleDeck.disabled = false;
      this.shuffleDeck.classList.remove('disabledButton');
      this.shuffleDeck.classList.add('drawCard');

      this.remainingCards.textContent = 'Remaining cards: 52';
      this.dealerScore.textContent = `Dealer score: ${game.dealerScore}`;
      this.playerScore.textContent = `Player score: ${game.playerScore}`;
    });
  }

  /**
   * @description Draw a card
   * @function
   * @param {function} handler
   * @param {object} game
   */
  bindDrawCard(handler, game) {
    const bindClickAndKeydown = async () => {
      await handler()
          .then((response) => {
            // console.log(response.card.cards[0].code);
            this.dealerCard.src = response.card.cards[0].image;
            this.playerCard.src = response.card.cards[1].image;
            this.remainingCards.textContent = `Remaining cards: ${response.card.remaining}`;
            this.dealerScore.textContent = `Dealer score: ${game.dealerScore}`;
            this.playerScore.textContent = `Player score: ${game.playerScore}`;
          })
          .catch((err) => {
            console.error(err);
          });

      // Enable new deck
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

  /**
   * @description Shuffle actual deck
   * @function
   * @param {function} handler
   */
  bindShuffleDeck(handler) {
    this.shuffleDeck.addEventListener('click', () => {
      handler()
          .catch((err) => {
            console.error(err);
          });
    });
  }
}
