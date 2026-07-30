import {TYPE, MIN_PRICE, MAX_PRICE, YEAR} from '../const.js';
import {getRandomArrayElement, generateTwoDates, getRandomNumber, getRandomBoolean} from '../utils.js';

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
    dueDateStart: dateStart,
    dueDateEnd: dateEnd,
    destination: destination,
    isFavorite: getRandomBoolean(),
    price: getRandomNumber(MIN_PRICE, MAX_PRICE),
    offers: eventOffers,
  };
};

export {createRandomEvent};
