import {render} from './render.js';
import SortView from './view/sort-view.js';
import EventListView from './view/event-list-view.js';
import EventView from './view/event-view.js';
import EventFormView from './view/event-form-view.js';

export default class BoardPresenter {
  eventListComponent = new EventListView();

  constructor({boardContainer, eventsModel}) {
    this.boardContainer = boardContainer;
    this.eventsModel = eventsModel;
  }

  init() {
    this.boardEvents = [...this.eventsModel.getEvents()]
      .sort((a, b) => new Date(a.dueDateStart) - new Date(b.dueDateStart));

    this.boardEvents = this.boardEvents.map((event) => ({...event}));

    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    this.renderEvents();
  }

  renderEvents() {
    const container = this.eventListComponent.getElement();

    if (this.boardEvents.length === 0) {
      return;
    }

    const eventFormView = new EventFormView({
      event: this.boardEvents[0],
      offers: this.boardEvents[0].offers
    });

    render(eventFormView, container);

    for (let i = 1; i < this.boardEvents.length; i++) {
      const eventView = new EventView({
        event: this.boardEvents[i],
        offers: this.boardEvents[i].offers
      });

      render(eventView, container);
    }
  }
}
