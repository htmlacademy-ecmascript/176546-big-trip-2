import {getOfferById} from './offers-view.js';
import AbstractView from '../framework/view/abstract-view.js';

function createTripCostTemplate(events, allOffers) {
  if (!events || events.length === 0) {
    return `
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>
    `;
  }

  const totalCost = events.reduce((sum, event) => {
    let eventTotal = event.price;
    const offerByType = allOffers.find((offer) => offer.type === event.type);

    if (event.offers.length > 0) {
      const offersTotal = event.offers.reduce((acc, offerId) => {
        const totalPrice = offerByType.offers.find((offer) => offer.id === offerId).price;

        return acc + totalPrice;
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
  #allOffers = null;

  constructor({ events, allOffers }) {
    super();
    this.#events = events;
    this.#allOffers = allOffers;
  }

  get template() {
    return createTripCostTemplate(this.#events, this.#allOffers);
  }
}
