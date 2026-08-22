import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewEventButtonView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;

    this.setEventListeners();
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  setEventListeners() {
    this.element.addEventListener('click', this.#clickHandler);
  }

  setDisabled(isDisabled) {
    if (this.element) {
      this.element.disabled = isDisabled;
      if (isDisabled) {
        this.element.style.opacity = '0.5';
        this.element.style.cursor = 'not-allowed';
      } else {
        this.element.style.opacity = '1';
        this.element.style.cursor = 'pointer';
      }
    }
  }

  #clickHandler = (evt) => {
    evt.preventDefault();

    if (this.element.disabled) {
      return;
    }

    if (this.#handleClick) {
      this.#handleClick();
    }
  };
}
