import { createElement } from '../render.js';

function createTripCostTemplate(events) {
  if (!events || events.length === 0) {
    return `
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>
    `;
  }

  const totalCost = events.reduce((sum, event) => {
    let eventTotal = event.price || 0;

    if (event.offers && event.offers.length > 0) {
      eventTotal += event.offers.reduce((offerSum, offer) => offerSum + (offer.price || 0), 0);
    }

    return sum + eventTotal;
  }, 0);

  return `
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
  `;
}

export default class TripCostView {
  constructor({ events = [] } = {}) {
    this.events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this.events);
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
