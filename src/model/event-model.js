import {createRandomEvent} from '../mock/event-mock.js';
import Observable from '../framework/observable.js';

const EVENT_COUNT = 4;

export default class EventsModel extends Observable{
  #events = [];

  constructor({offers, destinations}) {
    super();
    this.#events = Array.from({length: EVENT_COUNT}, () => createRandomEvent(offers, destinations));
  }

  get events() {
    return this.#events;
  }

  updateEvent(updateType, update) {
    this.#events = this.#events.map((event) => event.id === update.id ? update : event);

    this._notify(updateType, update);
  }

  set events(value) {
    this.#events = value;
  }

  addEvent(updatedType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updatedType, update);
  }

  deleteEvent(updateType, update) {
    this.#events = this.#events.filter((event) => event.id !== update.id);

    this._notify(updateType);
  }
}
