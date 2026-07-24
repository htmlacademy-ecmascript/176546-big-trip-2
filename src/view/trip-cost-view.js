import { createElement } from '../render.js';
import {getOfferById} from './offers-view.js';

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

    if (event.offers && Array.isArray(event.offers) && event.offers.length > 0) {
      const offersTotal = event.offers.reduce((offerSum, offerId) => {
        const offer = getOfferById(offerId);
        return offerSum + (offer ? offer.price : 0);
      }, 0);

      eventTotal += offersTotal;
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
