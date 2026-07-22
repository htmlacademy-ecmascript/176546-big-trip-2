import FiltersView from './view/filters-view.js';
import BoardPresenter from './board-presenter.js';
import {render, RenderPosition} from './render.js';
import EventsModel from './model/event-model.js';
import OffersModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import TripHeaderView from './view/trip-header-view.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  eventsModel,
  offersModel,
  destinationModel
});

const events = eventsModel.getEvents();
const tripHeaderView = new TripHeaderView({ events });

render(tripHeaderView, tripMain, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripControlsFilters);

boardPresenter.init();
