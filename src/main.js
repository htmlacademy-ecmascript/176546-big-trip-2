import BoardPresenter from './presenter/board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import EventsModel from './model/event-model.js';
import OffersModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import TripHeaderView from './view/trip-header-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';

const tripMain = document.querySelector('.trip-main');
const tripControls = document.querySelector('.trip-main__trip-controls');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
const filterModel = new FilterModel();
const eventsModel = new EventsModel({
  offers: offersModel.offers,
  destinations: destinationModel.destinations
});

const tripHeaderView = new TripHeaderView({
  events: eventsModel.events,
  allOffers: offersModel.offers,
  allDestinations: destinationModel.destinations
});

const newEventButtonView = new NewEventButtonView({
  onClick: () => {
    boardPresenter.createNewEvent();
  }
});

const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  eventsModel,
  destinationModel,
  offersModel,
  filterModel,
  tripHeaderView,
  newEventButtonView
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFilters,
  filterModel,
  eventsModel,
});

render(tripHeaderView, tripMain, RenderPosition.AFTERBEGIN);
render(newEventButtonView, tripControls, RenderPosition.AFTEREND);


filterPresenter.init();
boardPresenter.init();
