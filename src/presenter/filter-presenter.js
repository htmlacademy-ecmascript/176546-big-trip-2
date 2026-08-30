import {FilterType, UpdateType} from '../const.js';
import FiltersView from '../view/filters-view.js';
import {filter} from '../util/filter.js';
import {remove, render, replace} from '../framework/render.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #eventsModel = null;
  #filterComponent = null;

  constructor({filterContainer, filterModel, eventsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#eventsModel.events;
    const filterTypes = [
      FilterType.EVERYTHING,
      FilterType.FUTURE,
      FilterType.PRESENT,
      FilterType.PAST,
    ];

    return filterTypes.map((type) => ({
      type,
      name: type.toUpperCase(),
      count: filter[type](events).length,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MINOR, filterType);
  };
}
