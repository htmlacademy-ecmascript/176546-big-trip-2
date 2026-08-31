import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

const MAX_VISIBLE_CITIES = 3;
const DATE_FORMAT = 'DD MMM';

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

    const sortedEvents = [...this.#events].sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

    const uniqueNames = sortedEvents.reduce((acc, event) => {
      const dest = this.#allDestinations.find((d) => d.id === event.destination);
      if (dest && !acc.some((name) => name === dest.name)) {
        acc.push(dest.name);
      }
      return acc;
    }, []);

    let result = '';
    if (uniqueNames.length <= MAX_VISIBLE_CITIES) {
      result = uniqueNames.join(' &mdash; ');
    } else {
      const firstCity = uniqueNames[0];
      const lastCity = uniqueNames.at(-1);
      result = `${firstCity} &mdash; ... &mdash; ${lastCity}`;
    }

    return result;
  };

  #calculateDateTripInfo = () => {
    if (this.#events.length === 0) {
      return 'No dates';
    }

    const dates = this.#events
      .reduce((acc, event) => {
        acc.push(event.dateFrom, event.dateTo);
        return acc;
      }, [])
      .sort((a, b) => new Date(a) - new Date(b));

    const startDate = dayjs(dates[0]).format(DATE_FORMAT);
    const endDate = dayjs(dates.at(-1)).format(DATE_FORMAT);

    return startDate === endDate ? startDate : `${startDate} &mdash; ${endDate}`;
  };
}
