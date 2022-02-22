/* eslint-disable max-len */

const modal = document.getElementById('myModal');

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

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName('close')[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
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
   * @param {object} getGame
   * @param {function} startTurn
   */
  bindDrawCard(handler, getGame, startTurn) {
    const bindClickAndKeydown = async () => {
      let i = 0;
      while (!getGame().turnIsFinished && !getGame().isFinished) {
        const game = getGame();
        console.log(getGame().turnIsFinished);
        console.log(`turn f:${game.turnIsFinished}, game:${game.isFinished}`);
        await handler()
            .then((response) => {
              // console.log(response.card.cards[0].code);
              if (game.turn === 'PLAYER' || game.dealerHasMaxPoint) {
                game.playerCard = response.card.cards[0];
              } else {
                game.dealerCard = response.card.cards[0];
              }
              // game.turn === 'PLAYER' ?
              //   game.playerCard = response.card.cards[0]:
              //   game.dealerCard = response.card.cards[0];
              game.turn === 'PLAYER' ?
                this.playerCard.src = game.playerCard.image:
                this.dealerCard.src = game.dealerCard.image;
              this.remainingCards.textContent = `Remaining cards: ${response.card.remaining}`;
              this.dealerScore.textContent = `Dealer score: ${game.dealerScore}`;
              this.playerScore.textContent = `Player score: ${game.playerScore}`;

              if (game.isFinished) {
                modal.style.display = 'block';

                console.log('You lost !');
              }

              if (game.turn === 'DEALER') {
                game.turn = 'PLAYER';
              } else {
                if (!game.dealerHasMaxPoint) {
                  game.turn = 'DEALER';
                }
              }
              // game.turn === 'PLAYER' ?
              //   game.turn = 'DEALER':
              //   game.turn = 'PLAYER';
            })
            .catch((err) => {
              console.error(err);
            });
        i++;
        if (i > 10) {
          break;
        }
        // this.sleep(1000);
      }
      // console.log(`turn f:${game.turnIsFinished}, game:${game.isFinished}`);

      startTurn();
      // Enable new deck
      this.newDeck.classList.remove('disabledButton');
      this.newDeck.classList.add('newDeck');
      this.newDeck.disabled = false;
      this.deckCanBeReloaded = true;
    };
    // game.turnIsFinished = false;
    // console.log(`turn f:${game.turnIsFinished}, game:${game.isFinished}`);

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

  /**
   * @param {number} milliseconds
   */
  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}
