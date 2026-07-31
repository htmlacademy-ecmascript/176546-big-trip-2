import FiltersView from './view/filters-view.js';
import BoardPresenter from './board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import EventsModel from './model/event-model.js';
import OffersModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import TripHeaderView from './view/trip-header-view.js';
import {generateFilter} from "./filter";

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
const eventsModel = new EventsModel({
  offers: offersModel.offers,
  destinations: destinationModel.destinations
});

const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  eventsModel,
  destinationModel,
  offersModel
});

const tripHeaderView = new TripHeaderView({
  events: eventsModel.events,
  allOffers: offersModel.offers,
  allDestinations: destinationModel });

const filters = generateFilter(eventsModel.events);

render(tripHeaderView, tripMain, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), tripControlsFilters);

boardPresenter.init();
