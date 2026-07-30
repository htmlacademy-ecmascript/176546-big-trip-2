import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate(events, allDestinations) {
  if (!events || events.length === 0) {
    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">No destinations</h1>
        <p class="trip-info__dates">No dates</p>
      </div>
    `;
  }

  const destinationIds = events.map((event) => event.destination);
  const destinations = allDestinations.destinations.filter((dest) => destinationIds.includes(dest.id));

  const destinationNames = destinationIds.map((id) => {
    const dest = destinations.find((d) => d.id === id);
    return dest?.name;
  });

  let destinationsChain = '';
  if (destinationNames.length === 0) {
    destinationsChain = 'No destinations';
  } else if (destinationNames.length <= 3) {
    destinationsChain = destinationNames.join(' &mdash; ');
  } else {
    const firstCity = destinationNames[0];
    const lastCity = destinationNames[destinationNames.length - 1];
    destinationsChain = `${firstCity} &mdash; ... &mdash; ${lastCity}`;
  }

  const dates = events
    .map((event) => event.dueDateStart)
    .filter((date) => date)
    .sort((a, b) => new Date(a) - new Date(b));

  const startDate = dates.length > 0 ? dates[0] : null;
  const endDate = dates.length > 0 ? dates[dates.length - 1] : null;

  const dateFormat = 'DD MMM';
  const startFormatted = startDate ? dayjs(startDate).format(dateFormat) : '';
  const endFormatted = endDate ? dayjs(endDate).format(dateFormat) : '';

  let datesString = '';
  if (startFormatted && endFormatted) {
    if (startFormatted === endFormatted) {
      datesString = startFormatted;
    } else {
      datesString = `${startFormatted} &mdash; ${endFormatted}`;
    }
  }

  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationsChain}</h1>
      ${datesString ? `<p class="trip-info__dates">${datesString}</p>` : ''}
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
    return createTripInfoTemplate(this.#events, this.#allDestinations);
  }
}
