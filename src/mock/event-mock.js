import {TYPE, DESTINATION, MIN_PRICE, MAX_PRICE, YEAR} from '../const.js';
import {getRandomArrayElement, generateTwoDates, getRandomNumber} from '../utils.js';


function createRandomEvent() {
  const { dateStart, dateEnd } = generateTwoDates(YEAR);

  return {
    type: getRandomArrayElement(TYPE),
    destination: getRandomArrayElement(DESTINATION),
    dueDateStart: dateStart,
    dueDateEnd: dateEnd,
    price: getRandomNumber(MIN_PRICE, MAX_PRICE),
  };
}

export {createRandomEvent};
