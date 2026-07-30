import {render, replace} from './framework/render.js';
import SortView from './view/sort-view.js';
import EventListView from './view/event-list-view.js';
import EventView from './view/event-view.js';
import EventFormView from './view/event-form-view.js';
import ListEmptyView from './view/list-empty-view.js';

export default class BoardPresenter {
  #eventListComponent = new EventListView();
  #boardContainer = null;
  #eventsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #boardEvents = null;
  #offers = null;
  #destinations = null;

  constructor({boardContainer, eventsModel, destinationModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#boardEvents = [...this.#eventsModel.events]
      .sort((a, b) => new Date(a.dueDateStart) - new Date(b.dueDateStart));

    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationModel.destinations;

    this.#renderBoard();
  }

  #renderEvent(event) {
    const container = this.#eventListComponent.element;

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    const eventComponent = new EventView({
      event,
      offers: this.#offers,
      destination: this.#destinationModel.getDestinationById(event.destination),
      onRollupClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const eventEditComponent = new EventFormView({
      event,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onClick: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, container);
  }

  #renderBoard = () => {
    if (this.#boardEvents.length === 0) {
      render(new ListEmptyView(), this.#boardContainer);
      return;
    }

    render(new SortView(), this.#boardContainer);
    render(this.#eventListComponent, this.#boardContainer);

    for (let i = 0; i < this.#boardEvents.length; i++) {
      this.#renderEvent(this.#boardEvents[i]);
    }
  };
}
