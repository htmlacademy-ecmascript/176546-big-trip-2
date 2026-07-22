import { createElement } from '../render.js';

function createOfferFormTemplate(offer, isChecked = false) {
  const id = `event-offer-${offer.id}`;

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

export default class OfferFormView {
  constructor({offer, isChecked = false}) {
    this.offer = offer;
    this.isChecked = isChecked;
  }

  getTemplate() {
    return createOfferFormTemplate(this.offer, this.isChecked);
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
