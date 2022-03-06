const cardValues = [
  '0', 'A', 'J', 'Q', 'K',
];

/**
 * @function
 * @param {object} game
 */
export function updateScores(game) {
  try {
    // console.log(game.turn);
    // console.log('is finished:', game.isFinished);
    // console.log('dealerhas max point:', game.dealerHasMaxPoint);
    let number = (game.card.cards[0].code).substring(0, 1);

    if (cardValues.includes(number)) {
      number = (number === 'A' ? number = 0 : number = 10);
    } else {
      number = parseInt(number);
    }

    if (game.turn === 'PLAYER') {
      game.playerScore += number;
    } else {
      if ((game.dealerScore + number) < 21) {
        game.dealerScore += number;
      } else {
        game.dealerHasMaxPoint = true;
      }
      game.turnIsFinished = true;
    }
    // game.turn === 'PLAYER' ?
    //   game.playerScore += number :
    //   game.dealerScore += number;

    if (game.playerScore > 21) game.isFinished = true;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @function
 * @param {object} game
 */
export function dealerDrawToEndGame(game) {
  console.log(game);
  let number = (game.card.cards[0].code).substring(0, 1);

  if (cardValues.includes(number)) {
    number = (number === 'A' ? number = 0 : number = 10);
  } else {
    number = parseInt(number);
  }

  if (game.dealerScore + number > 21) {
    console.log('dealer has more than 21. game should stop');
    game.isFinished = true;
    return;
  }

  game.dealerScore += number;
  console.log(game.dealerScore);
}
