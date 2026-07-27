import {TYPE, MIN_PRICE, MAX_PRICE, YEAR, OFFERS} from '../const.js';
import {getRandomArrayElement, generateTwoDates, getRandomNumber, getRandomBoolean} from '../utils.js';
import {createRandomDestination} from './destination-mock.js';

const createRandomEvent = () => {
  const type = getRandomArrayElement(TYPE);
  const id = `${type}-${getRandomNumber(0, 20)}`;
  const { dateStart, dateEnd } = generateTwoDates(YEAR);

  const destination = createRandomDestination();

  const offersByType = OFFERS.find((item) => item.type === type);
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
