import EventFormView from '../view/event-form-view.js';
import { RenderPosition, remove, render } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';

const BLANK_EVENT = {
  type: 'flight',
  destination: '',
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  offers: [],
  isFavorite: false,
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

    try {
      await this.#handleDataChange(
        UserAction.ADD_EVENT,
        UpdateType.MAJOR,
        event,
        this,
      );
      this.destroy();
    } catch (error) {
      // ФИКС: ошибка уже обработана в board (resetState + shake),
      // не даём ей стать unhandled promise rejection; форма остаётся открытой
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

  setSaving() {
    this.#eventFormView?.updateElement({ isSaving: true });
  }

  resetState() {
    this.#eventFormView?.updateElement({ isSaving: false, isDeleting: false });
  }

  shake() {
    this.#eventFormView?.shake();
  }
}
