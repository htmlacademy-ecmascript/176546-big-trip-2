import OfferFormView from './offer-form-view.js';
import AbstractView from '../framework/view/abstract-view.js';

function createOffersTemplate(offers, offerIds) {
  if (!offers || offers.length === 0) {
    return '';
  }

  return offers.map((offer) => {
    const isChecked = offerIds ? offerIds.includes(offer.id) : false;

    const offerView = new OfferFormView({
      offer,
      isChecked
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
  #offers = null;
  #offerIds = null;

  constructor({ offers, offerIds }) {
    super();
    this.#offers = offers;
    this.#offerIds = offerIds;
  }

  get template() {
    return createOffersSectionTemplate(this.#offers, this.#offerIds);
  }
}
