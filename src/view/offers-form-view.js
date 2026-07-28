import OfferFormView from './offer-form-view.js';
import { OFFERS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function getFullOffers(offerIds, eventType) {
  if (!offerIds || offerIds.length === 0) {
    return [];
  }

  const offerType = OFFERS.find((item) => item.type === eventType);
  if (!offerType) {
    return [];
  }

  return offerType.offers;
}

function createOffersTemplate(offers, checkedOfferIds) {
  if (!offers || offers.length === 0) {
    return '';
  }

  return offers.map((offer) => {
    const isChecked = checkedOfferIds.includes(offer.id);

    const offerView = new OfferFormView({
      offer,
      isChecked: isChecked
    });
    return offerView.template;
  }).join('');
}

function createOffersSectionTemplate(offers, offerIds) {
  if (!offers || offers.length === 0) {
    return '';
  }

  const offersTemplate = createOffersTemplate(offers, offerIds);

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>
  `;
}

export default class OffersFormView extends AbstractView {
  #offerIds = null;
  #eventType = null;

  constructor({offerIds, eventType}) {
    super();
    this.#offerIds = offerIds;
    this.#eventType = eventType;
  }

  get template() {
    const fullOffers = getFullOffers(this.#offerIds, this.#eventType);
    return createOffersSectionTemplate(fullOffers, this.#offerIds);
  }
}
