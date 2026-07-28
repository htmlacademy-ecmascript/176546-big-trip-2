import { DESTINATION } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createDestinationsTemplate(currentDestination) {
  return DESTINATION.map((destination) => {
    const isSelected = destination === currentDestination ? 'selected' : '';
    return `<option value="${destination}" ${isSelected}></option>`;
  }).join('');
}

function createDestinationSelectTemplate(destinationName, eventType) {
  const destinationsTemplate = createDestinationsTemplate(destinationName);

  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${eventType}
      </label>
      <input class="event__input  event__input--destination"
       id="event-destination-1"
       type="text"
       name="event-destination"
       value="${destinationName.destination}"
       list="destination-list-1"
     >
      <datalist id="destination-list-1">
        ${destinationsTemplate}
      </datalist>
    </div>
  `;
}

export default class DestinationSelectView extends AbstractView {
  #destination = null;
  #eventType = null;

  constructor({destination, eventType}) {
    super();
    this.#destination = destination || '';
    this.#eventType = eventType || '';
  }

  get template() {
    return createDestinationSelectTemplate(this.#destination, this.#eventType);
  }
}
