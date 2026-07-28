import AbstractView from '../framework/view/abstract-view.js';

function createDestinationFormTemplate(destinationData) {
  const { description, pictures = [] } = destinationData || {};

  if (!description) {
    return '';
  }

  const photosHtml = pictures.length > 0
    ? pictures.map((picture) => `
      <img class="event__photo" src="${picture.src}" alt=${picture.description}>
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

export default class DestinationFormView extends AbstractView {
  #destinationData = null;

  constructor({ destinationData = {} }) {
    super();
    this.#destinationData = destinationData;
  }

  get template() {
    return createDestinationFormTemplate(this.#destinationData);
  }
}
