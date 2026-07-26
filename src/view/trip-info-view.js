import { createElement } from '../render.js';
import dayjs from 'dayjs';

function createTripInfoTemplate(events) {
  if (!events || events.length === 0) {
    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">No destinations</h1>
        <p class="trip-info__dates">No dates</p>
      </div>
    `;
  }

  const destinations = events
    .map((event) => {
      if (event.destination && event.destination.destination) {
        return event.destination.destination;
      }

      return null;
    })
    .filter((destination) => destination && destination.length > 0);

  const uniqueDestinations = [...new Set(destinations)];
  const destinationsChain = uniqueDestinations.join(' &mdash; ');

  const dates = events
    .map((event) => event.dueDateStart)
    .filter((date) => date)
    .sort((a, b) => new Date(a) - new Date(b));

  const startDate = dates.length > 0 ? dates[0] : null;
  const endDate = dates.length > 0 ? dates[dates.length - 1] : null;

  const dateFormat = 'DD MMM';
  const startFormatted = startDate ? dayjs(startDate).format(dateFormat) : '';
  const endFormatted = endDate ? dayjs(endDate).format(dateFormat) : '';

  let datesString = '';
  if (startFormatted && endFormatted) {
    if (startFormatted === endFormatted) {
      datesString = startFormatted;
    } else {
      datesString = `${startFormatted} &mdash; ${endFormatted}`;
    }
  }

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationsChain || 'No destinations'}</h1>
      ${datesString ? `<p class="trip-info__dates">${datesString}</p>` : ''}
    </div>
  `;
}

export default class TripInfoView {
  constructor({ events = [] } = {}) {
    this.events = events;
  }

  getTemplate() {
    return createTripInfoTemplate(this.events);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
