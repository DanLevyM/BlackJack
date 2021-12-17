/**
 * @class Model
 */
export default class Model {
  #deck = null;
  #card = null;
  #cardCanBeDrawed = false;
  #deckCanBeReloaded = true;

  /**
   * @constructor
   */
  constructor() {
    // this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  }

  /**
   * @function
   * @return {*} #deck
   */
  getDeck() {
    // console.log(this.#deck);
    return this.#deck;
  }

  /**
   * @function
   * @return {*} #deck
   */
  async getCard() {
    console.log(this.#card);
    console.log(this.#card.value);
    console.log(this.#card.suit);
    return this.#card;
  }

  /**
   * 
   * @returns {boolean}
   */
   deckCanBeReloaded() {
     return this.#deckCanBeReloaded ? true : false;
   }

  /**
   * 
   * @returns {boolean}
   */
   cardCanBeDraw() {
     return this.#cardCanBeDrawed ? true : false;
   }
   
  /**
   * @function
   */
  async newDeck() {
    if (!this.deckCanBeReloaded()) return new Promise((resolve, reject) => {
      reject('Deck cannot be drawed.');
    })
    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((response) => response.json())
        .then((data) => {
          this.#deck = data;
          console.log('drawdeck in model: ', this.#deck);
          this.#cardCanBeDrawed = true;
          this.#deckCanBeReloaded = false;
          return data;
        })
        .catch((err) => console.log(err));
  }

  /**
   * @function
   */
  async drawCard() {
    if (!this.cardCanBeDraw()) return new Promise((resolve, reject) => {
      reject('Card cannot be drawed.');
    })
    return await fetch(`https://deckofcardsapi.com/api/deck/${this.getDeck().deck_id}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
          this.#card = data;
          this.#deckCanBeReloaded = true;
          console.log(this.#card);
          return data;
        })
        .catch((err) => console.log(err));
  }
}
