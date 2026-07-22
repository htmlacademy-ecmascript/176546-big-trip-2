import {render} from './render.js';
import SortView from './view/sort-view.js';
import EventListView from './view/event-list-view.js';
import EventView from './view/event-view.js';
import EventFormView from './view/event-form-view.js';

export default class BoardPresenter {
  eventListComponent = new EventListView();

  constructor({boardContainer, eventsModel, offersModel, destinationModel}) {
    this.boardContainer = boardContainer;
    this.eventsModel = eventsModel;
    this.offersModel = offersModel;
    this.destinationModel = destinationModel;
  }

  init() {
    this.boardEvents = [...this.eventsModel.getEvents()]
      .sort((a, b) => new Date(a.dueDateStart) - new Date(b.dueDateStart));

    this.boardEvents = this.boardEvents.map((event) => {
      const destinationData = this.destinationModel.getRandomDestination(event);
      return {
        ...event,
        description: destinationData.description,
        photos: destinationData.foto
      };
    });

    render(new SortView(), this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    this.renderEvents();
  }

  renderEvents() {
    const container = this.eventListComponent.getElement();

    if (this.boardEvents.length === 0) {
      return;
    }

    const firstEvent = this.boardEvents[0];
    const allOffers = this.offersModel.getOffersByType(firstEvent.type, {isRandom: false});

    const eventFormView = new EventFormView({
      event: firstEvent,
      offers: allOffers
    });

    render(eventFormView, container);

    for (let i = 1; i < this.boardEvents.length; i++) {
      const event = this.boardEvents[i];
      const offers = this.offersModel.getOffersByType(event.type);

      const eventView = new EventView({
        event: event,
        offers: offers
      });

      render(eventView, container);
    }
  }
}
