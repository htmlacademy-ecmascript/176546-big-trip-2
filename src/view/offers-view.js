import OfferView from './offer-view.js';
import AbstractView from '../framework/view/abstract-view.js';

function createOffersTemplate(event, allOffers) {
  const safeOffers = allOffers;
  const eventOffers = event.offers;

  if (eventOffers.length === 0) {
    return '';
  }

  const offerGroup = safeOffers.find((offer) => offer.type === event.type);

  if (!offerGroup) {
    return '';
  }

  const currentOffers = offerGroup.offers.filter((offer) => eventOffers.includes(offer.id));

  if (currentOffers.length === 0) {
    return '';
  }

  return currentOffers.map((offer) => {
    const offerView = new OfferView({ offer });
    return offerView.template;
  }).join('');
}

function createOffersSectionTemplate(event, offers) {
  const offersTemplate = createOffersTemplate(event, offers);

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
