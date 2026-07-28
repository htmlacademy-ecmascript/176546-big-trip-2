import AbstractView from '../framework/view/abstract-view.js';

function createOfferFormTemplate(offer, isChecked = false) {
  const id = `event-offer-${offer}`;

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
             id="${id}"
             type="checkbox"
             name="event-offer-${offer.id}"
             ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="${id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  );
}

export default class OfferFormView extends AbstractView {
  #offer = null;
  #isChecked = null;

  constructor({offer, isChecked = false}) {
    super();
    this.#offer = offer;
    this.#isChecked = isChecked;
  }

  get template() {
    return createOfferFormTemplate(this.#offer, this.#isChecked);
  }
}
