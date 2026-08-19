import EventFormView from '../view/event-form-view.js';
import { RenderPosition, remove, render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventFormView = null;
  #offers = null;
  #destinations = null;

  constructor({ eventListContainer, offers, destinations, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#eventFormView) {
      return;
    }

    const emptyEvent = {
      id: null,
      type: 'flight',
      destination: '',
      dateFrom: null,
      dateTo: null,
      basePrice: 0,
      offers: [],
      isFavorite: false,
    };

    this.#eventFormView = new EventFormView({
      event: emptyEvent,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: this.#handleFormSubmit,
      onCancel: this.#handleCancelClick,
      isNew: true,
    });

    render(
      this.#eventFormView,
      this.#eventListContainer,
      RenderPosition.AFTERBEGIN
    );
  }

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      event
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  destroy() {
    if (this.#eventFormView) {
      remove(this.#eventFormView);
      this.#eventFormView = null;
    }

    this.#handleDestroy();
  }
}
