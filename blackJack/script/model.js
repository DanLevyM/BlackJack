/* eslint-disable max-len */
import getCardValue from './utils/score.js';

/**
 * @class Model
 */
export default class Model {
  #game = {
    deck: null,
    card: null,
    score: 0,
  };
  #cardCanBeDrawed = false;
  #deckCanBeReloaded = true;
  #deckCanBeShuffled = false;

  /**
   * @constructor
   */
  constructor() {
    // this.todos = JSON.parse(localStorage.getItem('todos')) || [];
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
   * @return {*} #deck
   */
  async getCard() {
    console.log(this.#game.card);
    console.log(this.#game.card.value);
    console.log(this.#game.card.suit);
    return this.#game.card;
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
   * @function
   */
  async newDeck() {
    if (!this.deckCanBeReloaded()) {
      return Promise.reject(new Error('Deck cannot be drawed.'));
    }

    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((response) => response.json())
        .then((data) => {
          this.#game.deck = data;
          console.log('drawdeck in model: ', this.#game.deck);
          this.#cardCanBeDrawed = true;
          this.#deckCanBeReloaded = false;
          this.#deckCanBeShuffled = true;
          return this.#game;
        })
        .catch((err) => console.log(err));
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
          this.#deckCanBeReloaded = true;
          getCardValue(this.#game);
          // console.log(this.#game.score);
          return this.#game;
        })
        .catch((err) => console.log(err));
  }

  /**
   * @function
   */
  async shuffleDeck() {
    console.log('shuff');
    if (!this.deckCanBeShuffled()) {
      return Promise.reject(new Error('Deck can\'t be shuffled. No deck detected.'));
    }
    return await fetch(`https://deckofcardsapi.com/api/deck/${this.#game.deck.deck_id}/shuffle/?remaining=true`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
  }
}
