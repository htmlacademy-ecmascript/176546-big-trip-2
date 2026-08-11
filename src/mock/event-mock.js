import {TYPE, MIN_BASE_PRICE, MAX_BASE_PRICE, YEAR} from '../const.js';
import {getRandomArrayElement, generateTwoDates, getRandomNumber, getRandomBoolean} from '../util/utils.js';

const createRandomEvent = (allOffers, destinations) => {
  const type = getRandomArrayElement(TYPE);
  const id = `${type}-${getRandomNumber(0, 20)}`;
  const { dateStart, dateEnd } = generateTwoDates(YEAR);

  const destination = getRandomArrayElement(destinations).id;

  const offersByType = allOffers.find((item) => item.type === type);
  const allOffersForType = offersByType ? offersByType.offers : [];
  const eventOffers = allOffersForType
    .filter(() => Math.random() > 0.5)
    .map((offer) => offer.id);

  return {
    id: id,
    type: type,
    dateFrom: dateStart,
    dateTo: dateEnd,
    destination: destination,
    isFavorite: getRandomBoolean(),
    basePrice: getRandomNumber(MIN_BASE_PRICE, MAX_BASE_PRICE),
    offers: eventOffers,
  };
};

export {createRandomEvent};
