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
    this.view.bindDrawCard(this.handleDrawCard, this.handleGetGame, this.handleStartTurn);
    this.view.bindShuffleDeck(this.handleShuffleDeck);
  }

  handleGetGame = () => {
    return this.model.getGame();
  };

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

  // handleEndTurn = () => {
  //   return this.model.endTurn();
  // };

  handleStartTurn = () => {
    return this.model.startTurn();
  };
}
