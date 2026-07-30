import {generateRandomImages, generateRandomText, getRandomArrayElement, getRandomNumber} from '../utils.js';
import {DESCRIPTION, LINK_FOTO, DESTINATION} from '../const.js';

function createRandomDestination() {
  const id = `destination-${getRandomNumber(0, 20)}`;
  const description = generateRandomText(DESCRIPTION, true);
  const destination = getRandomArrayElement(DESTINATION);

  const pictureCount = getRandomNumber(0, 5);
  const pictures = [];

  for (let i = 0; i < pictureCount; i++) {
    const src = generateRandomImages(LINK_FOTO, 1)[0];
    const pictureDescription = generateRandomText(DESCRIPTION, true, 1);
    pictures.push({
      src: src,
      description: pictureDescription
    });
  }

  return {
    id: id,
    description: description,
    name: destination,
    pictures: pictures,
  };
}

export {createRandomDestination};
