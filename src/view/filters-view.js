import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const filterName = filter.type.toLowerCase();
  const isChecked = filterName === currentFilterType ? 'checked' : '';
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
        class="trip-filters__filter-label ${filter.count === 0 ? 'trip-filters__filter-label--disabled' : ''}"
        for="filter-${filterName}"
      >
        ${filterName}
      </label>
    </div>
  `;
}

function createFilterTemplate(filters, currentFilterType) {
  const filterItems = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currenFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currenFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.setEventListeners();
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currenFilter);
  }

  setEventListeners() {
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
