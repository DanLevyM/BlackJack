/* eslint-disable max-len */
import {updateScores, dealerDrawToEndGame} from './utils/score.js';
const TURN = {
  PLAYER: 'PLAYER',
  DEALER: 'DEALER',
};

/**
 * @class Model
 */
export default class Model {
  #game = {
    deck: null,
    card: null,
    dealerScore: 0,
    playerScore: 0,
    dealerCard: null,
    playerCard: null,
    turn: TURN.PLAYER,
    dealerHasMaxPoint: false,
    turnIsFinished: false,
    isFinished: false,
  };
  #cardCanBeDrawed = false;
  #deckCanBeReloaded = true;
  #deckCanBeShuffled = false;
  #gameCanBeRestarted = false;

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * @function
   * @return {*}
   */
  getDeck() {
    return this.#game.deck;
  }

  /**
   * @function
   * @return {object}
   */
  getGame() {
    return this.#game;
  }

  /**
   * @return {boolean}
   */
  deckCanBeReloaded() {
    return this.#deckCanBeReloaded ? true : false;
  }

  /**
   * @return {boolean}
   */
  cardCanBeDraw() {
    return this.#cardCanBeDrawed ? true : false;
  }

  /**
   * @return {boolean}
   */
  deckCanBeShuffled() {
    return this.#deckCanBeShuffled ? true : false;
  }

  /**
   * @return {boolean}
   */
  gameCanBeRestarted() {
    return this.#gameCanBeRestarted ? true : false;
  }

  /**
 * @function
 */
  startTurn() {
    this.#game.turnIsFinished = false;
  }


  /**
   * @function
   */
  async newDeck() {
    this.#game.deck = null;
    this.#game.card = null;
    this.#game.dealerScore = 0;
    this.#game.playerScore = 0;
    this.#game.dealerHasMaxPoint = false;
    this.#game.isFinished = false;
    this.#game.dealerCardNotAdded = null;

    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((response) => response.json())
        .then((data) => {
          this.#game.deck = data;
          this.#cardCanBeDrawed = true;
          this.#deckCanBeReloaded = false;
          this.#deckCanBeShuffled = true;
          return this.#game;
        })
        .catch((err) => console.error(err));
  }

  /**
   * @function
   */
  async drawCard() {
    if (!this.cardCanBeDraw()) {
      return Promise.reject(new Error('Card cannot be drawed.'));
    }
    return await fetch(`https://deckofcardsapi.com/api/deck/${this.getDeck().deck_id}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
          this.#game.card = data;
          this.#gameCanBeRestarted = true;

          updateScores(this.#game);

          return this.#game;
        })
        .catch((err) => console.error(err));
  }

  /**
   * @function
   */
  async shuffleDeck() {
    if (!this.deckCanBeShuffled()) {
      return Promise.reject(new Error('Deck can\'t be shuffled. No deck detected.'));
    }
    return await fetch(`https://deckofcardsapi.com/api/deck/${this.#game.deck.deck_id}/shuffle/?remaining=true`)
        .then((response) => response.json())
        .then((data) => {
          // We let the console log to show during the presentation that it is shuffled
          console.log(data);
        })
        .catch((err) => console.error(`Internal error: ${err}`));
  }

  /**
   * @function
   */
  async stopDraw() {
    if (!this.cardCanBeDraw()) {
      return Promise.reject(new Error('Start game first !'));
    }
    return await fetch(`https://deckofcardsapi.com/api/deck/${this.getDeck().deck_id}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
          this.#game.card = data;

          if (this.#game.dealerHasMaxPoint) {
            this.#game.isFinished = true;
          } else {
            dealerDrawToEndGame(this.#game);
          }

          return this.#game;
        })
        .catch((err) => console.error(err));
  }
}
