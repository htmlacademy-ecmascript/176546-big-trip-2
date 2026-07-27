import { createElement } from '../render.js';
import TripInfoView from './trip-info-view.js';
import TripCostView from './trip-cost-view.js';

function createTripHeaderTemplate(events) {
  const infoView = new TripInfoView({ events });
  const costView = new TripCostView({ events });

  return `
    <section class="trip-main__trip-info trip-info">
      ${infoView.getTemplate()}
      ${costView.getTemplate()}
    </section>
  `;
}

export default class TripHeaderView {
  constructor({ events = [] } = {}) {
    this.events = events.sort((a, b) => new Date(a.dueDateStart) - new Date(b.dueDateStart));
  }

  getTemplate() {
    return createTripHeaderTemplate(this.events);
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
