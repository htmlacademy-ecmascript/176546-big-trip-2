import { render, remove, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import MessageView from '../view/message-view.js';
import EventPresenter from './event-presenter.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { sortEventDay, sortEventprice, sortEventTime } from '../util/sort.js';
import { filter } from '../util/filter.js';
import NewEventPresenter from './new-event-presenter.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #eventListComponent = null;
  #sortComponent = null;
  #boardContainer = null;
  #eventsModel = null;
  #destinationModel = null;
  #offersModel = null;
  #offers = null;
  #destinations = null;
  #eventPresenter = new Map();
  #currentSortType = SortType.DAY;
  #filterModel = null;
  #messageComponent = null;
  #newEventPresenter = null;
  #newEventButtonView = null;
  #buttonContainer = null;
  #isLoading = true;
  #uiBlocker = null;
  #isError = false;

  constructor({
    boardContainer,
    eventsModel,
    destinationModel,
    offersModel,
    filterModel,
    buttonContainer
  }) {
    this.#boardContainer = boardContainer;
    this.#eventsModel = eventsModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#buttonContainer = buttonContainer;
    this.#uiBlocker = new UiBlocker({
      lowerLimit: TimeLimit.LOWER_LIMIT,
      upperLimit: TimeLimit.UPPER_LIMIT,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#offers = this.#offersModel.offers;
    this.#destinations = this.#destinationModel.destinations;
    this.#isLoading = true;
    this.#isError = false;

    this.#renderNewEventButton();
    this.#renderBoard();
  }

  #renderMessage(type, filterType) {
    this.#messageComponent = new MessageView({ type, filterType });
    render(this.#messageComponent, this.#boardContainer);
  }

  #removeMessage() {
    if (this.#messageComponent) {
      remove(this.#messageComponent);
      this.#messageComponent = null;
    }
  }

  #renderNewEventButton() {
    if (this.#newEventButtonView) {
      return;
    }

    this.#newEventButtonView = new NewEventButtonView({
      onClick: () => {
        this.#createNewEvent();
      }
    });

    render(
      this.#newEventButtonView,
      this.#buttonContainer,
      RenderPosition.AFTEREND
    );
  }

  #getOrCreateEventListContainer() {
    if (this.#eventListComponent && this.#eventListComponent.element) {
      return this.#eventListComponent.element;
    }

    if (this.#messageComponent) {
      remove(this.#messageComponent);
      this.#messageComponent = null;
    }

    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#boardContainer);

    return this.#eventListComponent.element;
  }

  #resetFiltersAndSorting = () => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#currentSortType = SortType.DAY;
  };

  #createNewEvent() {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());

    if (this.#newEventPresenter) {
      return;
    }

    if (this.#newEventButtonView) {
      this.#newEventButtonView.setDisabled(true);
    }

    this.#resetFiltersAndSorting();

    const container = this.#getOrCreateEventListContainer();

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: container,
      offers: this.#offers,
      destinations: this.#destinations,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewEventDestroy,
      onEscape: () => {
        this.#newEventPresenter?.destroy();
      }
    });

    this.#newEventPresenter.init();
  }

  #handleNewEventDestroy = () => {
    this.#newEventPresenter = null;

    if (this.#newEventButtonView) {
      this.#newEventButtonView.setDisabled(false);
    }
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;

    return filter[filterType](events);
  }

  #handleViewAction = async (actionType, updateType, update, presenter) => {
    this.#uiBlocker.block();

    try {
      switch (actionType) {
        case UserAction.UPDATE_EVENT:
          presenter?.setSaving();
          await this.#eventsModel.updateEvent(updateType, update);
          break;
        case UserAction.ADD_EVENT:
          presenter?.setSaving();
          await this.#eventsModel.addEvent(update);
          break;
        case UserAction.DELETE_EVENT:
          presenter?.setDeleting();
          await this.#eventsModel.deleteEvent(update.id);
          break;
      }
    } catch (error) {
      presenter?.resetState();
      presenter?.shake();
      throw error;
    } finally {
      this.#uiBlocker.unblock();
    }
  };

  #handlePatchUpdate = (data) => {
    const presenter = this.#eventPresenter.get(data.id);

    if (presenter) {
      const destination = this.#destinationModel.getDestinationById(data.destination);
      const offers = this.#offersModel.offers;
      const destinations = this.#destinationModel.destinations;

      presenter.update(data, offers, destination, destinations);
    }
  };

  #handleMinorUpdate = () => {
    this.#currentSortType = SortType.DAY;
    this.#renderBoard();
  };

  #handleMajorUpdate = () => {
    this.#currentSortType = SortType.DAY;
    this.#renderBoard();
  };

  #handleInitUpdate = () => {
    const offersLoaded = this.#offersModel.offers && this.#offersModel.offers.length > 0;
    const destinationsLoaded = this.#destinationModel.destinations && this.#destinationModel.destinations.length > 0;
    const eventsLoaded = this.#eventsModel.events && this.#eventsModel.events.length > 0;

    if (offersLoaded && destinationsLoaded && eventsLoaded) {
      this.#isLoading = false;
      this.#offers = this.#offersModel.offers;
      this.#destinations = this.#destinationModel.destinations;
      this.#renderBoard();
    }
  };

  #handleInitError = () => {
    this.#isLoading = false;
    this.#isError = true;
    this.#renderBoard();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#handlePatchUpdate(data);
        break;
      case UpdateType.MINOR:
        this.#handleMinorUpdate();
        break;
      case UpdateType.MAJOR:
        this.#handleMajorUpdate();
        break;
      case UpdateType.INIT:
        this.#handleInitUpdate();
        break;
      case UpdateType.INIT_ERROR:
        this.#handleInitError();
        break;
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
    this.#currentSortType = sortType;
    this.#renderBoard();
  };

  #renderEvent(event, container) {
    const eventPresenter = new EventPresenter({
      eventListContainer: container,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    const destination = this.#destinationModel.getDestinationById(event.destination);
    const offers = this.#offersModel.offers;
    const destinations = this.#destinationModel.destinations;

    eventPresenter.init({
      event,
      offers: offers,
      destination: destination,
      destinations: destinations
    });

    this.#eventPresenter.set(event.id, eventPresenter);
  }

  #renderEventList() {
    const sortedEvents = this.#getSortedEvents(this.#currentSortType);

    sortedEvents.forEach((event) => {
      this.#renderEvent(event, this.#eventListComponent.element);
    });
  }

  #clearEventList() {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#newEventPresenter = null;
    }

    if (this.#sortComponent) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
    }

    if (this.#eventListComponent) {
      remove(this.#eventListComponent);
      this.#eventListComponent = null;
    }

    this.#removeMessage();
  }

  #renderBoard = () => {
    this.#clearEventList();

    if (this.#isError) {
      this.#renderMessage('error');
      return;
    }

    if (this.#isLoading) {
      this.#renderMessage('loading');
      return;
    }

    if (this.events.length === 0) {
      this.#renderMessage('empty', this.#filterModel.filter);
      return;
    }

    this.#renderSort();
    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#boardContainer);
    this.#renderEventList();
  };

  #getSortedEvents(sortType) {
    const sortFunctions = {
      [SortType.price]: sortEventprice,
      [SortType.TIME]: sortEventTime,
      [SortType.DAY]: sortEventDay,
    };

    const sortFunction = sortFunctions[sortType] || sortEventDay;
    return [...this.events].sort(sortFunction);
  }

  destroy() {
    if (this.#newEventButtonView) {
      remove(this.#newEventButtonView);
      this.#newEventButtonView = null;
    }
    this.#clearEventList();
  }
}
