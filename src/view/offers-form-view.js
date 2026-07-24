import { createElement } from '../render.js';
import OfferFormView from './offer-form-view.js';
import { OFFERS } from '../const.js';

function getFullOffers(offerIds, eventType) {
  if (!offerIds || offerIds.length === 0) {
    return [];
  }

  const offerType = OFFERS.find((item) => item.type === eventType);
  if (!offerType) {
    return [];
  }

  return offerType.offers.filter((offer) => offerIds.includes(offer.id));
}

function createOffersTemplate(offers) {
  if (!offers || offers.length === 0) {
    return '';
  }

  return offers.map((offer) => {
    const offerView = new OfferFormView({
      offer,
      isChecked: true
    });
    return offerView.getTemplate();
  }).join('');
}

function createOffersSectionTemplate(offers) {
  if (!offers || offers.length === 0) {
    return '';
  }

  const offersTemplate = createOffersTemplate(offers);

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>
  `;
}

export default class OffersFormView {
  constructor({offerIds, eventType}) {
    this.offerIds = offerIds || [];
    this.eventType = eventType || '';
  }

  getTemplate() {
    const fullOffers = getFullOffers(this.offerIds, this.eventType);
    return createOffersSectionTemplate(fullOffers);
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
