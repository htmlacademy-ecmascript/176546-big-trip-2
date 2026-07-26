import {createRandomEvent} from '../mock/event-mock.js';

const EVENT_COUNT = 4;

export default class EventsModel {
  events = Array.from({length: EVENT_COUNT}, createRandomEvent);

  getEvents() {
    return this.events;
  }
}
