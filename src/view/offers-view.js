import { createElement } from '../render.js';
import OfferView from './offer-view.js';
import { OFFERS } from '../const.js';

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
    return offerView.getTemplate();
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

export default class OffersView {
  constructor({ offerIds = [] }) {
    this.offerIds = offerIds;
  }

  getTemplate() {
    return createOffersSectionTemplate(this.offerIds);
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

export {getOfferById};
