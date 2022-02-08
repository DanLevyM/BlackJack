const cardValues = [
  '0', 'A', 'J', 'Q', 'K',
];

/**
 * @function
 * @param {object} card
 * @return {number}
 */
export default function updateScores(card) {
  try {
    let number = (card.code).substring(0, 1);
    if (cardValues.includes(number)) {
      number = (number === 'A' ? number = 0 : number = 10);
    } else {
      number = parseInt(number);
    }
    return number;
  } catch (e) {
    console.error(e);
  }
}

