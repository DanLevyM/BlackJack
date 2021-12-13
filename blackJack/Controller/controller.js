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

    // ---------------------TESTING --------------------------
    this.view.bindCheckDeckButton(this.handleCheckDeckButton);
  }

  /**
   * @function
   */
  handleNewDeck = async () => {
    return await this.model.drawDeck();
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
}
