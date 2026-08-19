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

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#offers,
      destination: this.#destination,
      onRollupClick: () => {
        this.#replaceCardToForm();
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventFormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      isNew: false, // ДОБАВИТЬ
      onSubmit: (updatedEvent) => {
        this.#replaceFormToEvent();
        const updateType = this.#getUpdateType(updatedEvent);
        this.#handleDataChange(
          UserAction.UPDATE_EVENT,
          updateType,
          updatedEvent,
        );
      },
      onClick: () => { // ИЗМЕНИТЬ: onClick вместо onRollupClick
        this.#replaceFormToEvent();
      },
      onCancel: () => { // ДОБАВИТЬ
        this.#replaceFormToEvent();
      },
      onDeleteClick: () => {
        this.#handleDeleteClick(this.#event);
      },
    });

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

  getMode() {
    return this.#mode;
  }

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
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    if (this.#eventComponent && this.#eventComponent.element && this.#eventComponent.element.parentElement) {
      replace(newEventComponent, this.#eventComponent);
    } else {
      render(newEventComponent, this.#eventListContainer);
    }
    this.#eventComponent = newEventComponent;

    const newEventEditComponent = new EventFormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      isNew: false, // ДОБАВИТЬ
      onSubmit: (updatedEvent) => {
        this.#replaceFormToEvent();
        const updateType = this.#getUpdateType(updatedEvent);
        this.#handleDataChange(
          UserAction.UPDATE_EVENT,
          updateType,
          updatedEvent,
        );
      },
      onClick: () => { // ИЗМЕНИТЬ: onClick вместо onRollupClick
        this.#replaceFormToEvent();
      },
      onCancel: () => { // ДОБАВИТЬ
        this.#replaceFormToEvent();
      },
      onDeleteClick: () => {
        this.#handleDeleteClick(this.#event);
      },
    });

    if (this.#eventEditComponent && this.#eventEditComponent.element && this.#eventEditComponent.element.parentElement) {
      replace(newEventEditComponent, this.#eventEditComponent);
    }
    this.#eventEditComponent = newEventEditComponent;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #replaceCardToForm() {
    const newEventEditComponent = new EventFormView({
      event: this.#event,
      offers: this.#offers,
      destinations: this.#destinations,
      isNew: false, // ДОБАВИТЬ
      onSubmit: (updatedEvent) => {
        this.#replaceFormToEvent();
        const updateType = this.#getUpdateType(updatedEvent);
        this.#handleDataChange(
          UserAction.UPDATE_EVENT,
          updateType,
          updatedEvent,
        );
      },
      onClick: () => { // ИЗМЕНИТЬ: onClick вместо onRollupClick
        this.#replaceFormToEvent();
      },
      onCancel: () => { // ДОБАВИТЬ
        this.#replaceFormToEvent();
      },
      onDeleteClick: () => {
        this.#handleDeleteClick(this.#event);
      },
    });

    if (this.#eventEditComponent) {
      remove(this.#eventEditComponent);
    }

    this.#eventEditComponent = newEventEditComponent;

    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = MODE.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event, isFavorite: !this.#event.isFavorite},
    );
  };

  #handleDeleteClick = (event) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MAJOR,
      event,
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
}
