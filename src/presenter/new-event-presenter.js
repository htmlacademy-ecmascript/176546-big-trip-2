import EventFormView from '../view/event-form-view.js';
import { RenderPosition, remove, render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const BLANK_EVENT = {
  type: 'flight',
  destination: '',
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  offers: [],
  isFavorite: false,
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #handleEscape = null;
  #handleResetFilters = null;
  #eventFormView = null;
  #offers = null;
  #destinations = null;
  #uiBlocker = null;

  constructor({
    eventListContainer,
    offers,
    destinations,
    onDataChange,
    onDestroy,
    onEscape,
    onResetFilters
  }) {
    this.#eventListContainer = eventListContainer;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#handleEscape = onEscape;
    this.#handleResetFilters = onResetFilters;
    this.#uiBlocker = new UiBlocker({
      lowerLimit: TimeLimit.LOWER_LIMIT,
      upperLimit: TimeLimit.UPPER_LIMIT,
    });
  }

  init() {
    if (this.#eventFormView) {
      return;
    }

    if (this.#handleResetFilters) {
      this.#handleResetFilters();
    }

    this.#eventFormView = new EventFormView({
      event: BLANK_EVENT,
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

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handleEscape?.();
    }
  };

  #handleFormSubmit = async (event) => {
    if (!event.dateFrom || !event.dateTo) {
      return;
    }

    const eventWithoutId = { ...event };
    delete eventWithoutId.id;

    this.#uiBlocker.block();

    try {
      await this.#handleDataChange(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        eventWithoutId
      );
      this.destroy();
    } catch (error) {
      this.#eventFormView?.updateElement({ isSaving: false, isDeleting: false });
      this.#eventFormView?.shake();
    } finally {
      this.#uiBlocker.unblock();
    }
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  destroy() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    if (this.#eventFormView) {
      remove(this.#eventFormView);
      this.#eventFormView = null;
    }

    this.#handleDestroy();
  }
}
