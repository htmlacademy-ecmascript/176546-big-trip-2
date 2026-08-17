import {remove, render, RenderPosition} from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #offers = null;
  #destinations = null;
  #eventEditComponent = null;

  constructor({eventListContainer, onDataChange, onDestroy, offers, destinations}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    if (!this.#eventListContainer) {
      return;
    }

    const emptyEvent = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      type: 'flight',
      destination: '',
      dateFrom: '',
      dateTo: '',
      basePrice: '',
      offers: [],
      isFavorite: false
    };

    this.#eventEditComponent = new EventFormView({
      event: emptyEvent,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#eventEditComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    if (this.#handleDestroy) {
      this.#handleDestroy();
    }

    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (event) => {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      {id, ...event},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
