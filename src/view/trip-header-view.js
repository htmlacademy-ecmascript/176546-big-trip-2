import TripInfoView from './trip-info-view.js';
import TripCostView from './trip-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';

function createTripHeaderTemplate(events, allOffers, allDestinations) {
  const infoView = new TripInfoView({ events, allDestinations });
  const costView = new TripCostView({ events, allOffers });

  return `
    <section class="trip-main__trip-info trip-info">
      ${infoView.template}
      ${costView.template}
    </section>
  `;
}

export default class TripHeaderView extends AbstractView {
  #events = null;
  #allOffers = null;
  #allDestinations = null;

  constructor({ events, allOffers, allDestinations }) {
    super();
    this.#events = events.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  get template() {
    return createTripHeaderTemplate(this.#events, this.#allOffers, this.#allDestinations);
  }
}
