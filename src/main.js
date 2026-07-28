import FiltersView from './view/filters-view.js';
import BoardPresenter from './board-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import EventsModel from './model/event-model.js';
import DestinationModel from './model/destination-model.js';
import TripHeaderView from './view/trip-header-view.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const destinationModel = new DestinationModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  eventsModel,
  destinationModel
});

const events = eventsModel.events;
const tripHeaderView = new TripHeaderView({ events });

render(tripHeaderView, tripMain, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripControlsFilters);

boardPresenter.init();
