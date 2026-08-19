import BoardPresenter from './presenter/board-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import {render, RenderPosition} from './framework/render.js';
import EventsModel from './model/event-model.js';
import OffersModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
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

const headerPresenter = new HeaderPresenter({
  headerContainer: tripMain,
  eventsModel,
  destinationModel,
  offersModel
});

const boardPresenter = new BoardPresenter({
  boardContainer: tripEvents,
  eventsModel,
  destinationModel,
  offersModel,
  filterModel,
});

const newEventButtonView = new NewEventButtonView({
  onClick: () => {
    boardPresenter.createNewEvent();
  }
});

boardPresenter.setNewEventButtonView(newEventButtonView);

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFilters,
  filterModel,
  eventsModel,
});

render(newEventButtonView, tripControls, RenderPosition.AFTEREND);

headerPresenter.init();
filterPresenter.init();
boardPresenter.init();
