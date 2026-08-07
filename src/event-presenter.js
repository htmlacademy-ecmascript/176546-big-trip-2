import EventView from './view/event-view.js';
import {remove, render, replace} from './framework/render.js';
import EventFormView from './view/event-form-view.js';

const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #event = null;
  #offers = null;
  #destination = null;
  #destinations = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = MODE.DEFAULT;

  constructor({eventListContainer, onDataChange, onModeChange}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init({event, offers, destination, destinations}) {
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
    this.#destinations = destinations;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination,
      onRollupClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventFormView({
      event,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: () => {
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onClick: () => {
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode = MODE.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode = MODE.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = MODE.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#event, isFavorite: !this.#event.isFavorite});
  };

  update(event, offers, destination, destinations) {
    this.#event = event;
    this.#offers = offers;
    this.#destination = destination;
    this.#destinations = destinations;

    const newEventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination,
      onRollupClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    replace(newEventComponent, this.#eventComponent);
    this.#eventComponent = newEventComponent;

    const newEventEditComponent = new EventFormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: () => {
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
      onClick: () => {
        this.#replaceFormToEvent();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (this.#eventEditComponent && this.#eventEditComponent.element.parentNode) {
      replace(newEventEditComponent, this.#eventEditComponent);
      this.#eventEditComponent = newEventEditComponent;
    }
  }
}
