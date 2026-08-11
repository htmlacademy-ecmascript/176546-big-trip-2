import {render, remove} from '../framework/render.js';
import {updateItem} from '../common.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import {SortType} from '../const.js';
import {sortEventDay, sortEventbasePrice, sortEventTime} from '../util/sort.js';

export default class BoardPresenter {
  #eventListComponent = null;
  #sortComponent = null;
  #boardContainer = null;
  #eventsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #boardEvents = null;
  #offers = null;
  #destinations = null;
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;
  #souredBoardEvents = [];

  constructor({boardContainer, eventsModel, destinationModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#souredBoardEvents = [...this.#eventsModel.events];
    this.#sortEvents(this.#currentSortType);

    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationModel.destinations;

    this.#renderBoard();
  }

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updatedEvent);
    this.#souredBoardEvents = updateItem(this.#souredBoardEvents, updatedEvent);

    const eventPresenter = this.#eventPresenter.get(updatedEvent.id);

    if (eventPresenter) {
      const destination = this.#destinationModel.getDestinationById(updatedEvent.destination);
      eventPresenter.update(
        updatedEvent,
        this.#offers,
        destination,
        this.#destinations
      );
    }
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });

    render(this.#sortComponent, this.#boardContainer);
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortEvents(sortType);

    if (this.#sortComponent) {
      this.#sortComponent.setSortType(sortType);
    }

    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderEvent(event, container) {
    const eventPresenter = new EventPresenter({
      eventListContainer: container,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });

    const destination = this.#destinationModel.getDestinationById(event.destination);

    eventPresenter.init({
      event,
      offers: this.#offers,
      destination: destination,
      destinations: this.#destinations
    });

    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #renderEventList() {
    this.#boardEvents.forEach((event) => {
      this.#renderEvent(event, this.#eventListComponent.element);
    });
  }

  #clearEventList() {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }

    if (this.#eventListComponent) {
      remove(this.#eventListComponent);
    }
  }

  #renderBoard = () => {
    this.#clearEventList();

    if (this.#boardEvents.length === 0) {
      render(new ListEmptyView(), this.#boardContainer);
      return;
    }

    this.#renderSort();

    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#boardContainer);

    this.#renderEventList();
  };

  #getSortedEvents(sortType) {
    const sortFunctions = {
      [SortType.basePrice]: sortEventbasePrice,
      [SortType.TIME]: sortEventTime,
      [SortType.DAY]: sortEventDay,
    };

    const sortFunction = sortFunctions[sortType] || sortEventDay;
    return [...this.#souredBoardEvents].sort(sortFunction);
  }

  #sortEvents(sortType) {
    this.#boardEvents = this.#getSortedEvents(sortType);
    this.#currentSortType = sortType;
  }
}
