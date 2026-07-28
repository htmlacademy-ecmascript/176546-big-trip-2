import TripInfoView from './trip-info-view.js';
import TripCostView from './trip-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';

function createTripHeaderTemplate(events) {
  const infoView = new TripInfoView({ events });
  const costView = new TripCostView({ events });

  return `
    <section class="trip-main__trip-info trip-info">
      ${infoView.template}
      ${costView.template}
    </section>
  `;
}

export default class TripHeaderView extends AbstractView {
  #events = null;

  constructor({ events = [] } = {}) {
    super();
    this.#events = events.sort((a, b) => new Date(a.dueDateStart) - new Date(b.dueDateStart));
  }

  get template() {
    return createTripHeaderTemplate(this.#events);
  }
}
