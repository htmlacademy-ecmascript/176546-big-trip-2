import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter) {
  const filterType = filter.type;
  const filterName = filterType.toLowerCase();
  const isChecked = filterType === 'everything' ? 'checked' : '';
  const isDisabled = filter.count === 0 ? 'disabled' : '';

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${filterName}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${filterName}"
        ${isChecked}
        ${isDisabled}
      >
      <label
        class="trip-filters__filter-label${filter.count === 0 ? ' trip-filters__filter-label--disabled' : ''}"
        for="filter-${filterName}"
      >
        ${filterName}
      </label>
    </div>
  `;
}

function createFilterTemplate(filters) {
  const filtersArray = Array.isArray(filters) ? filters : filters?.filters || [];

  if (!filtersArray || filtersArray.length === 0) {
    return '';
  }

  const filterItems = filtersArray
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
