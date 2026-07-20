import FiltersView from './view/filters-view.js';
import BoardPresenter from './board-presenter.js';
import {render, RenderPosition} from './render.js';
import TripInfoView from './view/trip-info-view.js';

const tripMain = document.querySelector('.trip-main');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: tripEvents});

render(new TripInfoView(), tripMain, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripControlsFilters);

boardPresenter.init();
