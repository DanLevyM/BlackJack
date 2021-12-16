import Controller from './Controller/controller.js';
import Model from './Model/model.js';
import View from './View/view.js';

const app = new Controller(new Model(), new View());
