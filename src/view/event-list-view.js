import { createElement } from '../render.js';

function createTaskListTemplate() {
  return '<ul className="trip-events__list"></ul>';
}

export default class EventListView {
  getTemplate() {
    return createTaskListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
