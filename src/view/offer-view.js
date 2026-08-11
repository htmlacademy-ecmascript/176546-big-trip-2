import AbstractView from '../framework/view/abstract-view.js';

function createOfferTemplate(offer) {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-basePrice">${offer.basePrice}</span>
    </li>`
  );
}

export default class OfferView extends AbstractView {
  #offer = null;

  constructor({offer}) {
    super();
    this.#offer = offer;
  }

  get template() {
    return createOfferTemplate(this.#offer);
  }
}
