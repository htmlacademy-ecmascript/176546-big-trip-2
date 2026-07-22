import {getRandomNumber} from '../utils.js';
import {MAX_PRICE, MIN_PRICE, OFFERS} from '../const.js';

const addPrices = (offers) => offers.map((offer) => ({
  id: offer.id,
  type: offer.type,
  title: offer.title,
  price: getRandomNumber(MIN_PRICE, MAX_PRICE),
}));

const getOffersByType = (type) => OFFERS.filter((offer) => offer.type === type);

const createAllOffers = (type) => addPrices(getOffersByType(type));

const createRandomOffers = (type) => {
  const offers = getOffersByType(type);
  if (offers.length === 0) {
    return [];
  }

  const count = Math.floor(Math.random() * (offers.length + 1));
  const shuffled = [...offers].sort(() => Math.random() - 0.5);
  return addPrices(shuffled.slice(0, count));
};

export {
  createRandomOffers,
  createAllOffers
};
