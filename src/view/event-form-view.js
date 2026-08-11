import OffersFormView from './offers-form-view.js';
import DestinationFormView from './destination-form-view.js';
import DestinationSelectView from './destination-select-view.js';
import EventTypesView from './event-types-view.js';
import {humanizeEventDueDate} from '../util/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const DATE_FORMAT = 'd/m/y H:i';
const TIME_FORMAT = 'DD/MM/YY HH:mm';

function createEventFormTemplate(event, allOffers, allDestinations) {
  const destinationData = allDestinations.find((dest) => dest.id === event.destination);

  const destinationSelectView = new DestinationSelectView({
    destination: destinationData.name,
    eventType: event.type,
    allDestinations: allDestinations
  }).template;

  const destinationInfoView = new DestinationFormView({
    destinationData
  }).template;

  const offerType = allOffers.find((item) => item.type === event.type);
  const allOffersForType = offerType ? offerType.offers : [];

  const offersView = new OffersFormView({
    offers: allOffersForType,
    offerIds: event.offers
  }).template;

  const eventTypesView = new EventTypesView({
    currentType: event.type
  }).template;

  const humanizeTimeStart = humanizeEventDueDate(event.dateFrom, TIME_FORMAT);
  const humanizeTimeEnd = humanizeEventDueDate(event.dateTo, TIME_FORMAT);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${event.type}.png" alt="Event type icon">
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
              <span class="visually-hidden">price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${event.basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersView}
          ${destinationInfoView}
        </section>
      </form>
    </li>`
  );
}

export default class EventFormView extends AbstractStatefulView {
  #allOffers = null;
  #allDestinations = null;
  #handleFormSubmit = null;
  #handlerFormClick = null;
  #datePickerStart = null;
  #datePickerEnd = null;

  constructor({event, offers, destinations, onSubmit, onClick}) {
    super();
    this._setState(EventFormView.parseEventToState(event));
    this.#allOffers = offers;
    this.#allDestinations = destinations;
    this.#handleFormSubmit = onSubmit;
    this.#handlerFormClick = onClick;

    this._restoreHandlers();
  }

  get template() {
    return createEventFormTemplate(
      this._state,
      this.#allOffers,
      this.#allDestinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerStart) {
      this.#datePickerStart.destroy();
      this.#datePickerStart = null;
    }

    if (this.#datePickerEnd) {
      this.#datePickerEnd.destroy();
      this.#datePickerEnd = null;
    }
  }

  reset(event) {
    this.updateElement(
      EventFormView.parseEventToState(event),
    );
  }

  _restoreHandlers() {
    const form = this.element.querySelector('form');
    if (form) {
      form.addEventListener('submit', this.#formSaveHandler);
    }

    const rollupBtn = this.element.querySelector('.event__rollup-btn');
    if (rollupBtn) {
      rollupBtn.addEventListener('click', this.#formClickHandler);
    }

    const typeInputs = this.element.querySelectorAll('.event__type-input');
    typeInputs.forEach((input) => {
      input.addEventListener('change', this.#eventTypeChangeHandler);
    });

    const destinationInput = this.element.querySelector('.event__input--destination');
    if (destinationInput) {
      destinationInput.addEventListener('change', this.#destinationChangeHandler);
    }

    const offerCheckboxes = this.element.querySelectorAll('.event__offer-checkbox');
    offerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });

    const priceInput = this.element.querySelector('.event__input--price');
    if (priceInput) {
      priceInput.addEventListener('change', this.#priceChangeHandler);
    }

    this.#setDatePickers();
  }

  #formSaveHandler = (evt) => {
    evt.preventDefault();
    const eventData = EventFormView.parseStateToEvent(this._state);
    this.#handleFormSubmit(eventData);
  };

  #formClickHandler = (evt) => {
    evt.preventDefault();
    this.#handlerFormClick();
  };

  #eventTypeChangeHandler = (evt) => {
    const newType = evt.target.value;

    this.updateElement({
      type: newType,
      offers: []
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #destinationChangeHandler = (evt) => {
    const destinationName = evt.target.value;

    const destinationData = this.#allDestinations.find(
      (dest) => dest.name === destinationName
    );

    if (destinationData) {
      this.updateElement({
        destination: destinationData.id,
      });
    }
  };

  #priceChangeHandler = (evt) => {
    const newPrice = parseFloat(evt.target.value);

    if (!isNaN(newPrice) && newPrice >= 0) {
      this.updateElement({
        basePrice: newPrice,
      });
    }
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const offerId = evt.target.value;

    let currentOffers = [...this._state.offers];

    if (evt.target.checked) {
      currentOffers.push(offerId);
    } else {
      currentOffers = currentOffers.filter((id) => id !== offerId);
    }

    this.updateElement({
      offers: currentOffers
    });
  };

  #setDatePickers() {
    const startInput = this.element.querySelector('#event-start-time-1');
    const endInput = this.element.querySelector('#event-end-time-1');

    if (startInput) {
      this.#datePickerStart = flatpickr(
        startInput,
        {
          dateFormat: DATE_FORMAT,
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler,
          enableTime: true,
        },
      );
    }

    if (endInput) {
      this.#datePickerEnd = flatpickr(
        endInput,
        {
          dateFormat: DATE_FORMAT,
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler,
          enableTime: true,
        },
      );
    }
  }

  static parseEventToState(event) {
    return {
      id: event.id,
      type: event.type,
      destination: event.destination,
      dateFrom: event.dateFrom,
      dateTo: event.dateTo,
      basePrice: event.basePrice,
      offers: event.offers,
      isFavorite: event.isFavorite
    };
  }

  static parseStateToEvent(state) {
    return {
      id: state.id,
      type: state.type,
      destination: state.destination,
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      basePrice: state.basePrice,
      offers: state.offers,
      isFavorite: state.isFavorite
    };
  }
}
