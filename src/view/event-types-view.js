import { TYPE } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createEventTypesTemplate(currentType) {
  return TYPE.map((type) => {
    const isChecked = type === currentType ? 'checked' : '';
    const id = `event-type-${type}-1`;

    return `
      <div class="event__type-item">
        <input id="${id}"
               class="event__type-input visually-hidden"
               type="radio"
               name="event-type"
               value="${type}"
               ${isChecked}>
        <label class="event__type-label event__type-label--${type}" for="${id}">
          ${type.charAt(0).toUpperCase() + type.slice(1)}
        </label>
      </div>
    `;
  }).join('');
}

function createEventTypesSectionTemplate(currentType) {
  const eventTypesTemplate = createEventTypesTemplate(currentType);

  return `
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
        ${eventTypesTemplate}
      </fieldset>
    </div>
  `;
}

export default class EventTypesView extends AbstractView {
  #currentType = null;

  constructor({currentType}) {
    super();
    this.#currentType = currentType;
  }

  get template() {
    return createEventTypesSectionTemplate(this.#currentType);
  }
}
