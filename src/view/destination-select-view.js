import AbstractView from '../framework/view/abstract-view.js';

function createDestinationsTemplate(allDestinations, currentDestination) {
  if (!allDestinations || allDestinations.length === 0) {
    return '';
  }

  return allDestinations.map((dest) => {
    const isSelected = dest.name === currentDestination ? 'selected' : '';
    return `<option value="${dest.name}" ${isSelected}></option>`;
  }).join('');
}

function createDestinationSelectTemplate(destinationName, eventType, allDestinations) {
  const destinationsTemplate = createDestinationsTemplate(allDestinations, destinationName);

  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${eventType}
      </label>
      <input class="event__input  event__input--destination"
       id="event-destination-1"
       type="text"
       name="event-destination"
       value="${destinationName || ''}"
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
  #allDestinations = null;

  constructor({destination, eventType, allDestinations}) {
    super();
    this.#destination = destination;
    this.#eventType = eventType;
    this.#allDestinations = allDestinations || [];
  }

  get template() {
    return createDestinationSelectTemplate(
      this.#destination,
      this.#eventType,
      this.#allDestinations
    );
  }
}
