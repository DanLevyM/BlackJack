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

    this.view.bindNewDeck(this.handleNewDeck, this.model.getGame());
    this.view.bindDrawCard(this.handleDrawCard, this.model.getGame());
    this.view.bindShuffleDeck(this.handleShuffleDeck);
  }

  /**
   * @function
   * @return {Promise}
   */
  handleNewDeck = async () => {
    return await this.model.newDeck();
  };

  /**
   * @function
   * @return {Promise}
   */
  handleDrawCard = async () => {
    return await this.model.drawCard();
  };

  /**
   * @function
   * @return {Promise}
   */
  handleShuffleDeck = async () => {
    return await this.model.shuffleDeck();
  };
}
