import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripHeaderView from '../view/trip-header-view.js';
import { UpdateType } from '../const.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #eventsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #headerView = null;
  #offers = null;
  #destinations = null;

  constructor({ headerContainer, eventsModel, destinationModel, offersModel }) {
    this.#headerContainer = headerContainer;
    this.#eventsModel = eventsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationModel.destinations;

    this.#renderHeader();
  }

  #handleModelEvent = (updateType) => {
    if (
      updateType === UpdateType.INIT ||
      updateType === UpdateType.MAJOR ||
      updateType === UpdateType.MINOR ||
      updateType === UpdateType.PATCH
    ) {
      this.#updateHeader();
    }
  };

  #renderHeader() {
    const allEvents = this.#eventsModel.events;

    if (!allEvents || allEvents.length === 0) {
      this.#clearHeader();
      return;
    }

    const destinations = this.#destinations;
    const offers = this.#offers;

    const newHeader = new TripHeaderView({
      events: allEvents,
      allOffers: offers,
      allDestinations: destinations
    });

    if (this.#headerView) {
      replace(newHeader, this.#headerView);
    } else {
      render(newHeader, this.#headerContainer, RenderPosition.AFTERBEGIN);
    }

    this.#headerView = newHeader;
  }

  #updateHeader() {
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationModel.destinations;
    this.#renderHeader();
  }

  #clearHeader() {
    if (this.#headerView) {
      remove(this.#headerView);
      this.#headerView = null;
    }
  }

  destroy() {
    this.#clearHeader();
  }
}
