import {createRandomDestination} from '../mock/destination-mock.js';

export default class DestinationModel {
  getRandomDestination(event) {
    return createRandomDestination(event);
  }
}
