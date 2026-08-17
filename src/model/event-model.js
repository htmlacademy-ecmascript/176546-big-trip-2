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
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can`t update unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

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
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can`t update unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
