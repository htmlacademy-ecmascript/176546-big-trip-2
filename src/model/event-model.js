import {createRandomEvent} from '../mock/event-mock.js';

const EVENT_COUNT = 4;

export default class EventsModel {
  #events = [];

  constructor({offers, destinations}) {
    this.#events = Array.from({length: EVENT_COUNT}, () => createRandomEvent(offers, destinations));
  }

  get events() {
    return this.#events;
  }
}
