import {createAllOffers, createRandomOffers} from '../mock/offer-mock.js';

export default class OffersModel {
  getRandomOffers(type) {
    return createRandomOffers(type);
  }

  getAllOffers(type) {
    return createAllOffers(type);
  }

  getOffersByType(type, isRandom = true) {
    return isRandom ? this.getRandomOffers(type) : this.getAllOffers(type);
  }
}
