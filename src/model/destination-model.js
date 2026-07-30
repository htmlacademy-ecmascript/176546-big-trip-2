import {createRandomDestination} from '../mock/destination-mock.js';

export default class DestinationModel {
  #destinations = Array.from({length: 5}, createRandomDestination);

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
