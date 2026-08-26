import BoardPresenter from './presenter/board-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import EventsModel from './model/event-model.js';
import OffersModel from './model/offer-model.js';
import DestinationModel from './model/destination-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsApiService from './api/events-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';
import OffersApiService from './api/offers-api-service.js';

const tripMain = document.querySelector('.trip-main');
const tripControls = document.querySelector('.trip-main__trip-controls');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic leokonv';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

async function initApp() {
  const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION);
  const destinationsApiService = new DestinationsApiService(END_POINT, AUTHORIZATION);
  const eventsApiService = new EventsApiService(END_POINT, AUTHORIZATION);

  const filterModel = new FilterModel();
  const offersModel = new OffersModel({ offersApiService });
  const destinationModel = new DestinationModel({ destinationsApiService });
  const eventsModel = new EventsModel({ eventsApiService });

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
    buttonContainer: tripControls
  });

  const filterPresenter = new FilterPresenter({
    filterContainer: tripControlsFilters,
    filterModel,
    eventsModel,
  });

  headerPresenter.init();
  filterPresenter.init();
  boardPresenter.init();

  await Promise.all([
    offersModel.init(),
    destinationModel.init(),
    eventsModel.init()
  ]);
}

initApp();
