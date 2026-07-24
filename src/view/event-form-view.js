import { createElement } from '../render.js';
import OffersFormView from './offers-form-view.js';
import DestinationFormView from './destination-form-view.js';
import DestinationSelectView from './destination-select-view.js';
import EventTypesView from './event-types-view.js';
import {humanizeEventDueDate} from '../utils.js';

const TIME_FORMAT = 'DD/MM/YY HH:mm';

function createEventFormTemplate(event) {
  const destinationSelectView = new DestinationSelectView({
    destination: event.destination || '',
    eventType: event.type
  }).getTemplate();

  const destinationData = {
    description: event.destination?.description || '',
    pictures: event.destination?.pictures || []
  };

  const destinationInfoView = new DestinationFormView({
    destinationData
  }).getTemplate();

  const offersView = new OffersFormView({
    offerIds: event.offers || [],
    eventType: event.type
  }).getTemplate();

  const eventTypesView = new EventTypesView({
    currentType: event.type
  }).getTemplate();

  const humanizeTimeStart = humanizeEventDueDate(event.dueDateStart, TIME_FORMAT);
  const humanizeTimeEnd = humanizeEventDueDate(event.dueDateEnd, TIME_FORMAT);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
             ${eventTypesView}
            </div>
          </div>

          ${destinationSelectView}

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${humanizeTimeStart}'>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${humanizeTimeEnd}'>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${offersView}
          ${destinationInfoView}
        </section>
      </form>
    </li>`
  );
}

export default class EventFormView {
  constructor({event = []}) {
    this.event = event;
  }

  getTemplate() {
    return createEventFormTemplate(this.event);
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
