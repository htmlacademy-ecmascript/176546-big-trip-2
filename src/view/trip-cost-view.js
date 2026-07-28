import {getOfferById} from './offers-view.js';
import AbstractView from '../framework/view/abstract-view.js';

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

export default class TripCostView extends AbstractView {
  #events = null;

  constructor({ events }) {
    super();
    this.#events = events;
  }

  get template() {
    return createTripCostTemplate(this.#events);
  }
}
