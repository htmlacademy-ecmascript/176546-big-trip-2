import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

const MAX_VISIBLE_CITIES = 3;
const dateFormat = 'DD MMM';

function createTripInfoTemplate(tripDateData, tripCityData) {
  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripCityData}</h1>
      <p class="trip-info__dates">${tripDateData}</p>
    </div>
  `;
}

export default class TripInfoView extends AbstractView {
  #events = null;
  #allDestinations = null;

  constructor({ events, allDestinations }) {
    super();
    this.#events = events;
    this.#allDestinations = allDestinations;
  }

  get template() {
    const tripCityData = this.#calculateCityInfo();
    const tripDateData = this.#calculateDateTripInfo();

    return createTripInfoTemplate(tripDateData, tripCityData);
  }

  #calculateCityInfo = () => {
    if (this.#events.length === 0) {
      return 'No destinations';
    }

    const destinationIds = this.#events.map((event) => event.destination);
    const destinations = this.#allDestinations.destinations.filter((dest) => destinationIds.includes(dest.id));

    const destinationNames = destinations.map((dest) => dest.name);

    let result = '';
    if (destinationNames.length <= MAX_VISIBLE_CITIES) {
      result = destinationNames.join(' &mdash; ');
    } else {
      const firstCity = destinationNames[0];
      const lastCity = destinationNames.at(-1);

      result = `${firstCity} &mdash; ... &mdash; ${lastCity}`;
    }

    return result;
  };

  #calculateDateTripInfo = () => {
    if (this.#events.length === 0) {
      return 'No dates';
    }

    const dates = this.#events
      .map((event) => event.dateFrom)
      .sort((a, b) => new Date(a) - new Date(b));

    const startDate = dayjs(dates[0]).format(dateFormat);
    const endDate = dayjs(dates.at(-1)).format(dateFormat);

    return startDate === endDate ? startDate : `${startDate} &mdash; ${endDate}`;
  };
}
