import {OFFERS} from '../const.js';

export default class OffersModel {
  #offers = OFFERS;

  get offers() {
    return this.#offers;
  }
}
