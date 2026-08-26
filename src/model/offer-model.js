import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  #adaptToClient(offer) {
    return {
      type: offer.type,
      offers: offer.offers.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price
      }))
    };
  }

  async init() {
    try {
      const rawOffers = await this.#offersApiService.offers;
      this.#offers = rawOffers.map(this.#adaptToClient);
      this._notify(UpdateType.INIT, this.#offers);
      return this.#offers;
    } catch(error) {
      this.#offers = [];
      this._notify(UpdateType.INIT, this.#offers);
      return this.#offers;
    }
  }

  get offers() {
    return this.#offers;
  }
}
