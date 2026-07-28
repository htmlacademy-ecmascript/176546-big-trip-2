import OfferView from './offer-view.js';
import { OFFERS } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function getOfferById(offerId) {
  for (const offerType of OFFERS) {
    const foundOffer = offerType.offers.find((offer) => offer.id === offerId);
    if (foundOffer) {
      return foundOffer;
    }
  }
  return null;
}

function createOffersTemplate(offerIds) {
  if (!offerIds || offerIds.length === 0) {
    return '';
  }

  const offers = offerIds
    .map((id) => getOfferById(id))
    .filter((offer) => offer !== null);

  if (offers.length === 0) {
    return '';
  }

  return offers.map((offer) => {
    const offerView = new OfferView({ offer });
    return offerView.template;
  }).join('');
}

function createOffersSectionTemplate(offerIds) {
  const offersTemplate = createOffersTemplate(offerIds);

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
  #offerIds = null;

  constructor({ offerIds = [] }) {
    super();
    this.#offerIds = offerIds;
  }

  get template() {
    return createOffersSectionTemplate(this.#offerIds);
  }
}

export {getOfferById};
