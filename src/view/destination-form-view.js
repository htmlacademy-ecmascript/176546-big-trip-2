import { createElement } from '../render.js';

function createDestinationFormTemplate(destinationData) {
  const { description, photos = [] } = destinationData || {};

  if (!description && photos.length === 0) {
    return '';
  }

  const photosHtml = photos.length > 0
    ? photos.map((photo) => `
      <img class="event__photo" src="${photo}" alt="Event photo">
    `).join('')
    : '';

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${description ? `<p class="event__destination-description">${description}</p>` : ''}
      ${photosHtml ? `
        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosHtml}
          </div>
        </div>
      ` : ''}
    </section>
  `;
}

export default class DestinationFormView {
  constructor({ destinationData = {} }) {
    this.destinationData = destinationData;
  }

  getTemplate() {
    return createDestinationFormTemplate(this.destinationData);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
