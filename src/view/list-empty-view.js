import AbstractView from '../framework/view/abstract-view.js';

function createListEmptyTemplate(filterType) {
  const messages = {
    everything: 'Click New Event to create your first point',
    past: 'There are no past events now',
    present: 'There are no present events now',
    future: 'There are no future events now'
  };

  const message = messages[filterType] || messages.everything;
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType = 'everything') {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmptyTemplate(this.#filterType);
  }
}
