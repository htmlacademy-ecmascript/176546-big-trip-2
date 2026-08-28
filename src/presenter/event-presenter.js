import EventView from '../view/event-view.js';
import {remove, render, replace} from '../framework/render.js';
import EventFormView from '../view/event-form-view.js';
import {UpdateType, UserAction} from '../const.js';

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

    this.#eventComponent = this.#createEventView();
    this.#eventEditComponent = this.#createEventFormView();

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  update(event, offers, destination, destinations) {
    this.init({event, offers, destination, destinations});
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  }

  #createEventView() {
    return new EventView({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination,
      onRollupClick: this.#replaceCardToForm.bind(this),
      onFavoriteClick: this.#handleFavoriteClick,
    });
  }

  #createEventFormView() {
    return new EventFormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      isNew: false,
      onSubmit: this.#handleFormSubmit,
      onClick: this.#replaceFormToEvent.bind(this),
      onCancel: this.#replaceFormToEvent.bind(this),
      onDeleteClick: this.#handleDeleteClick.bind(this),
    });
  }

  #handleFormSubmit = (updatedEvent) => {
    const updateType = this.#getUpdateType(updatedEvent);
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      updateType,
      updatedEvent,
      this,
    );
    this.#replaceFormToEvent();
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MAJOR,
      event,
      this,
    );
    this.#replaceFormToEvent();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #replaceCardToForm() {
    const newEventEditComponent = this.#createEventFormView();

    if (this.#eventEditComponent) {
      remove(this.#eventEditComponent);
    }

    this.#eventEditComponent = newEventEditComponent;

    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToEvent = () => {
    if (!this.#eventComponent || !this.#eventEditComponent) {
      return;
    }

    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = MODE.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event, isFavorite: !this.#event.isFavorite},
    );
  };

  #getUpdateType(updatedEvent) {
    const oldEvent = this.#event;

    const isMajorChange =
      oldEvent.destination !== updatedEvent.destination ||
      oldEvent.dateFrom !== updatedEvent.dateFrom ||
      oldEvent.dateTo !== updatedEvent.dateTo ||
      oldEvent.basePrice !== updatedEvent.basePrice ||
      JSON.stringify(oldEvent.offers) !== JSON.stringify(updatedEvent.offers);

    return isMajorChange ? UpdateType.MAJOR : UpdateType.MINOR;
  }

  setSaving() {
    if (this.#eventEditComponent && this.#eventEditComponent.element) {
      this.#eventEditComponent.updateElement({ isSaving: true });
    }
  }

  setDeleting() {
    if (this.#eventEditComponent && this.#eventEditComponent.element) {
      this.#eventEditComponent.updateElement({ isDeleting: true });
    }
  }

  resetState() {
    if (this.#eventEditComponent && this.#eventEditComponent.element) {
      this.#eventEditComponent.updateElement({ isSaving: false, isDeleting: false });
    }
  }

  shake() {
    if (this.#eventEditComponent && this.#eventEditComponent.element) {
      this.#eventEditComponent.shake();
    }
  }
}
