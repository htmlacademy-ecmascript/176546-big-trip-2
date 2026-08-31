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
    } catch(error) {
      this._notify(UpdateType.INIT_ERROR, null);
      throw error;
    }
  }

  get offers() {
    return this.#offers;
  }
}
