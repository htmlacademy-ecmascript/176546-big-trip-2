import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  #adaptToServer(event) {
    return {
      'id': event.id,
      'type': event.type,
      'date_from': event.dateFrom instanceof Date ? event.dateFrom.toISOString() : event.dateFrom,
      'date_to': event.dateTo instanceof Date ? event.dateTo.toISOString() : event.dateTo,
      'destination': event.destination,
      'is_favorite': event.isFavorite || false,
      'base_price': event.basePrice,
      'offers': event.offers || []
    };
  }

  async updateEvent(event) {
    const adaptedEvent = this.#adaptToServer(event);
    const response = await this._load({
      url: `points/${adaptedEvent.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedEvent),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return await ApiService.parseResponse(response);
  }

  async addEvent(event) {
    const adaptedEvent = this.#adaptToServer(event);
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(adaptedEvent),
      headers: new Headers({'Content-Type': 'application/json'})
    });
    return await ApiService.parseResponse(response);
  }

  async deleteEvent(id) {
    const response = await this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
    return response;
  }
}
