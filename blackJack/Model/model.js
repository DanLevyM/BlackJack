/**
 * @param {int} a
 */
export default class Model {
  #deck = null;

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
    console.log(this.#deck);
    return this.#deck;
  }

  /**
   * @function
   */
  async drawDeck() {
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
  test() {
    console.log(this.#deck);
  }
}
