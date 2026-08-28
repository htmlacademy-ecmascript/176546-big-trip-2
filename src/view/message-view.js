import AbstractView from '../framework/view/abstract-view.js';

const MESSAGES = {
  loading: 'Loading...',
  empty: {
    everything: 'Click New Event to create your first point',
    past: 'There are no past events now',
    present: 'There are no present events now',
    future: 'There are no future events now'
  },
  error: 'Failed to load latest route information'
};

function createMessageTemplate(type, filterType) {
  if (type === 'loading') {
    return `<p class="trip-events__msg">${MESSAGES.loading}</p>`;
  }

  if (type === 'error') {
    return `<p class="trip-events__msg">${MESSAGES.error}</p>`;
  }

  const message = MESSAGES.empty[filterType] || MESSAGES.empty.everything;
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class MessageView extends AbstractView {
  #type = null;
  #filterType = null;

  constructor({ type, filterType = 'everything' }) {
    super();
    this.#type = type;
    this.#filterType = filterType;
  }

  get template() {
    return createMessageTemplate(this.#type, this.#filterType);
  }
}
