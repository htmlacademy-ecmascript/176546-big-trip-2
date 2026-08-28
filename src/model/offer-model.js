import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
      this._notify(UpdateType.INIT, this.#offers);
      return this.#offers;
    } catch(error) {
      this.#offers = [];
      this._notify(UpdateType.INIT_ERROR, null);
      return this.#offers;
    }
  }

  get offers() {
    return this.#offers;
  }
}
