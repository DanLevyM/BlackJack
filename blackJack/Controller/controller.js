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
    this.view.bindDrawCard(this.handleDrawCard);

    // ---------------------TESTING --------------------------
    this.view.bindCheckDeckButton(this.handleCheckDeckButton);
    this.view.bindCheckCardButton(this.handleCheckCardButton);
  }

  /**
   * @function
   */
  handleNewDeck = async () => {
    return await this.model.newDeck();
  };

  handleDrawCard = async () => {
    return await this.model.drawCard();
  };

  /**
   * @function
   */
  getCard() {
    this.model.getCard();
  };

  // -------------------------------------------------------
  // ---------------------TESTING --------------------------
  // -------------------------------------------------------

  /**
   * @function
   */
  handleCheckDeckButton = async () => {
    this.model.getDeck();
  };

  /**
   * @function
   */
  handleCheckCardButton = async () => {
    this.model.getCard();
  };
}
