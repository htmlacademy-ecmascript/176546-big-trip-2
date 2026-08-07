import {render, remove} from './framework/render.js';
import {updateItem} from './common.js';
import SortView from './view/sort-view.js';
import EventListView from './view/event-list-view.js';
import ListEmptyView from './view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class BoardPresenter {
  #eventListComponent = null; // ✅ Теперь null, создается в renderBoard
  #sortComponent = null; // ✅ Добавляем поле
  #boardContainer = null;
  #eventsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #boardEvents = null;
  #offers = null;
  #destinations = null;
  #eventPresenter = new Map();

  constructor({boardContainer, eventsModel, destinationModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events];
    this.#sortEvents();

    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationModel.destinations;

    this.#renderBoard();
  }

  #handleEventChange = (updatedEvent) => {
    this.#boardEvents = updateItem(this.#boardEvents, updatedEvent);

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

  #renderEvent(event, container) {
    const eventPresenter = new EventPresenter({
      eventListContainer: container,
      onDataChange: this.#handleEventChange,
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
    for (let i = 0; i < this.#boardEvents.length; i++) {
      this.#renderEvent(this.#boardEvents[i], this.#eventListComponent.element);
    }
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

    this.#sortComponent = new SortView();
    render(this.#sortComponent, this.#boardContainer);

    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#boardContainer);

    this.#renderEventList();
  };

  #sortEvents() {
    this.#boardEvents = [...this.#boardEvents]
      .sort((a, b) => new Date(a.dueDateStart) - new Date(b.dueDateStart));
  }
}
