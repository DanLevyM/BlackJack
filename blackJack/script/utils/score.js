const cardValues = [
  '0', 'A', 'J', 'Q', 'K',
];

/**
 * @function
 * @param {object} game
 */
export default function getCardValue(game) {
  try {
    let number = (game.card.cards[0].code).substring(0, 1);
    if (cardValues.includes(number)) {
      number = (number === 'A' ? number = 0 : number = 10);
    } else {
      number = parseInt(number);
    }
    game.score += number;
  } catch (e) {
    console.error(e);
  }
}

