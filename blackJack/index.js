import Controller from './Controller/controller.js';
import Model from './Model/model.js';
import View from './View/view.js';

const app = new Controller(new Model(), new View());

// fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.cards);
//       console.log(data.cards[0].suit);
//       console.log(data.cards[0].value);
//     })
//     .catch((err) => console.log(err));
