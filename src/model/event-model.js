import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #offersModel = null;
  #destinationModel = null;
  #events = [];

  constructor({ eventsApiService, offersModel, destinationModel }) {
    super();
    this.#eventsApiService = eventsApiService;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
  }

  #adaptToClient(event) {
    return {
      id: event.id,
      type: event.type,
      destination: event.destination,
      dateFrom: event.date_from ? new Date(event.date_from) : null,
      dateTo: event.date_to ? new Date(event.date_to) : null,
      basePrice: event.base_price,
      offers: event.offers,
      isFavorite: event.is_favorite || false
    };
  }

  async init() {
    try {
      const rawEvents = await this.#eventsApiService.events;
      this.#events = rawEvents.map(this.#adaptToClient);
      this._notify(UpdateType.INIT, this.#events);
    } catch(err) {
      this.#events = [];
      this._notify(UpdateType.INIT_ERROR, null);
    }
  }

  get events() {
    return this.#events;
  }

  async updateEvent(updateType, updatedEvent) {
    try {
      const response = await this.#eventsApiService.updateEvent(updatedEvent);
      const adaptedEvent = this.#adaptToClient(response);

      this.#events = this.#events.map((event) =>
        event.id === updatedEvent.id
          ? { ...event, ...adaptedEvent }
          : event
      );

      const index = this.#events.findIndex((event) => event.id === updatedEvent.id);
      this._notify(updateType, this.#events[index]);
      return this.#events[index];
    } catch(err) {
      throw new Error('Can`t update event');
    }
  }

  async addEvent(event) {
    try {
      const newEvent = await this.#eventsApiService.addEvent(event);
      const adaptedEvent = this.#adaptToClient(newEvent);
      this.#events = [...this.#events, adaptedEvent];
      this._notify(UpdateType.MAJOR, adaptedEvent);
      return adaptedEvent;
    } catch(err) {
      throw new Error('Can`t add event');
    }
  }

  async deleteEvent(id) {
    try {
      await this.#eventsApiService.deleteEvent(id);
      const deletedEvent = this.#events.find((event) => event.id === id);
      this.#events = this.#events.filter((event) => event.id !== id);
      this._notify(UpdateType.MAJOR, { id });
      return deletedEvent;
    } catch(err) {
      throw new Error('Can`t delete event');
    }
  }

  getDestinationById(id) {
    return this.#destinationModel?.getDestinationById(id);
  }
}
