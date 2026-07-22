import {generateRandomImages, generateRandomText} from '../utils.js';
import {DESCRIPTION, LINK_FOTO} from '../const.js';

function createRandomDestination(event) {
  const destinationName = event.destination;
  const description = generateRandomText(DESCRIPTION, true);
  const foto = description ? generateRandomImages(LINK_FOTO, 5) : [];

  return {
    destination: destinationName,
    description: description,
    foto: foto,
  };
}

export {createRandomDestination};
