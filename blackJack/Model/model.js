/**
 * @class Model
 */
export default class Model {
  #deck = null;
  #card = null;

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
   * @function
   */
  async newDeck() {
    return await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((response) => response.json())
        .then((data) => {
          this.#deck = data;
          console.log('drawdeck in model: ', this.#deck);
          return data;
        })
        .catch((err) => console.log(err));
  }

  /**
   * @function
   */
  async drawCard() {
    return await fetch(`https://deckofcardsapi.com/api/deck/${this.getDeck().deck_id}/draw/?count=1`)
        .then((response) => response.json())
        .then((data) => {
          this.#card = data.cards[0];
          return data.cards[0];
        })
        .catch((err) => console.log(err));
  }

  // /**
  //  * @function
  //  */
  // displayNewCard() {
  // }

  /**
   * @function
   */
  test() {
    console.log(this.#deck);
  }
}
