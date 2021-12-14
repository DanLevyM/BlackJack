/**
 * @class Api
 */
export default class Api {
  #deck;

  /**
   * @constructor
   */
  constructor() {
  }

  /**
   * @function
   */
  async shuffleCards() {
    await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((response) => response.json())
        .then((data) => {
          this.#deck = data;
          console.log(this.#deck);
          return data;
        })
        .catch((err) => console.log(err));
  }
}
