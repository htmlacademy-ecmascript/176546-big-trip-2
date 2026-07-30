import OfferView from './offer-view.js';
import AbstractView from '../framework/view/abstract-view.js';

function createOffersTemplate(event, allOffers) {
  if (event.offers.length === 0) {
    return '';
  }

  const offerByType = allOffers.find((offer) => offer.type === event.type).offers;

  const currentOffers = offerByType.filter((offer) => event.offers.includes(offer.id));


  return currentOffers.map((offer) => {
    const offerView = new OfferView({ offer });
    return offerView.template;
  }).join('');
}

function createOffersSectionTemplate(offerIds, offers) {
  const offersTemplate = createOffersTemplate(offerIds, offers);

  if (!offersTemplate) {
    return '';
  }

  return `
    <ul class="event__selected-offers">
      ${offersTemplate}
    </ul>
  `;
}

export default class OffersView extends AbstractView {
  #event = null;
  #offers = null;

  constructor({ event, offers }) {
    super();
    this.#event = event;
    this.#offers = offers;
  }

  get template() {
    return createOffersSectionTemplate(this.#event, this.#offers);
  }
}
