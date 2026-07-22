import {createElement} from '../render.js';
import {formatDate, humanizeEventDueDate, formatDateDiff} from '../utils.js';
import OfferView from './offer-view.js';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

function createOffersTemplate(offers) {
  if (!offers || offers.length === 0) {
    return '';
  }

  return offers.map((offer) => {
    const offerView = new OfferView({offer});
    return offerView.getTemplate();
  }).join('');
}

function createEventTemplate(event, offers) {
  const {type, destination, dueDateStart, dueDateEnd, price} = event;

  const date = formatDate(dueDateStart);
  const humanizeDate = humanizeEventDueDate(dueDateStart, DATE_FORMAT);

  const timeStart = formatDate(dueDateStart, {withTime: true});
  const humanizeTimeStart = humanizeEventDueDate(dueDateStart, TIME_FORMAT);

  const timeEnd = formatDate(dueDateEnd, {withTime: true});
  const humanizeTimeEnd = humanizeEventDueDate(dueDateEnd, TIME_FORMAT);

  const duration = formatDateDiff(timeStart, timeEnd);

  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${date}>${humanizeDate}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${timeStart}>${humanizeTimeStart}</time>
            &mdash;
            <time class="event__end-time" datetime=${timeEnd}>${humanizeTimeEnd}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn event__favorite-btn--active" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class EventView {
  constructor({event, offers = []}) {
    this.event = event;
    this.offers = offers;
  }

  getTemplate() {
    return createEventTemplate(this.event, this.offers);
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
