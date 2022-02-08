/* eslint-disable max-len */
/**
 * @class Controller
 */
export default class Controller {
  /**
   * @constructor
   * @param {Model} model
   * @param {View} view
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindNewDeck(this.handleNewDeck);
    this.view.bindDrawCard(this.handleDrawCard, this.model.cardCanBeDraw(), this.model.getGame());
    this.view.bindShuffleDeck(this.handleShuffleDeck);
  }

  /**
   * @function
   */
  handleNewDeck = async () => {
    return await this.model.newDeck();
  };

  /**
   * @function
   */
  handleDrawCard = async () => {
    return await this.model.drawCard();
  };

  /**
   * @function
   */
  handleShuffleDeck = async () => {
    return await this.model.shuffleDeck();
  };

  /**
   * @function
   */
  getCard() {
    this.model.getCard();
  };
}
