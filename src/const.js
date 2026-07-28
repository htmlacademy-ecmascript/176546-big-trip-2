const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const YEAR = 2026;
const LINK_FOTO = 'https://loremflickr.com/248/152?random=';

const TYPE = [
  'taxi',
  'bus',
  'train',
  'drive',
  'ship',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const EVENTS = [
  {
    'id': '1',
    'base_price': 1100,
    'date_from': '2019-07-10T22:55:56.845Z',
    'date_to': '2019-07-11T11:22:13.375Z',
    'destination': 'destination-5',
    'is_favorite': false,
    'offers': ['offer-1', 'offer-2', 'offer-3'],
    'type': 'taxi'
  },
  {
    'id': '2',
    'base_price': 850,
    'date_from': '2023-05-15T08:30:00.000Z',
    'date_to': '2023-05-15T14:45:00.000Z',
    'destination': 'destination-12',
    'is_favorite': true,
    'offers': ['offer-4', 'offer-5'],
    'type': 'bus'
  },
  {
    'id': '3',
    'base_price': 2450,
    'date_from': '2023-06-20T06:15:00.000Z',
    'date_to': '2023-06-20T18:30:00.000Z',
    'destination': 'destination-3',
    'is_favorite': false,
    'offers': ['offer-6', 'offer-7', 'offer-8'],
    'type': 'train'
  },
  {
    'id': '4',
    'base_price': 3200,
    'date_from': '2023-07-01T09:00:00.000Z',
    'date_to': '2023-07-05T20:00:00.000Z',
    'destination': 'destination-18',
    'is_favorite': true,
    'offers': ['offer-9', 'offer-10'],
    'type': 'drive'
  },
  {
    'id': '5',
    'base_price': 5600,
    'date_from': '2023-08-10T10:30:00.000Z',
    'date_to': '2023-08-12T16:15:00.000Z',
    'destination': 'destination-7',
    'is_favorite': false,
    'offers': ['offer-11', 'offer-12', 'offer-13'],
    'type': 'ship'
  },
  {
    'id': '6',
    'base_price': 7800,
    'date_from': '2023-09-05T03:45:00.000Z',
    'date_to': '2023-09-05T21:30:00.000Z',
    'destination': 'destination-14',
    'is_favorite': false,
    'offers': ['offer-14', 'offer-15', 'offer-16', 'offer-17'],
    'type': 'flight'
  },
  {
    'id': '7',
    'base_price': 450,
    'date_from': '2023-10-15T14:00:00.000Z',
    'date_to': '2023-10-16T12:00:00.000Z',
    'destination': 'destination-9',
    'is_favorite': true,
    'offers': ['offer-18', 'offer-19', 'offer-20'],
    'type': 'check-in'
  },
  {
    'id': '8',
    'base_price': 350,
    'date_from': '2023-11-01T10:00:00.000Z',
    'date_to': '2023-11-01T12:30:00.000Z',
    'destination': 'destination-2',
    'is_favorite': false,
    'offers': ['offer-21', 'offer-22'],
    'type': 'sightseeing'
  },
  {
    'id': '9',
    'base_price': 680,
    'date_from': '2023-12-20T19:00:00.000Z',
    'date_to': '2023-12-20T22:00:00.000Z',
    'destination': 'destination-20',
    'is_favorite': true,
    'offers': ['offer-23', 'offer-24', 'offer-25'],
    'type': 'restaurant'
  },
  {
    'id': '10',
    'base_price': 1900,
    'date_from': '2024-01-15T07:30:00.000Z',
    'date_to': '2024-01-15T19:45:00.000Z',
    'destination': 'destination-11',
    'isFavorite': false,
    'offers': ['offer-1', 'offer-2', 'offer-3'],
    'type': 'taxi'
  }
];

const OFFERS = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': 'offer-1',
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': 'offer-2',
        'title': 'Extra luggage space',
        'price': 50
      },
      {
        'id': 'offer-3',
        'title': 'Child seat',
        'price': 25
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 'offer-4',
        'title': 'Wi-Fi connection',
        'price': 15
      },
      {
        'id': 'offer-5',
        'title': 'USB charging port',
        'price': 10
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 'offer-6',
        'title': 'First class seat',
        'price': 200
      },
      {
        'id': 'offer-7',
        'title': 'Dining car reservation',
        'price': 45
      },
      {
        'id': 'offer-8',
        'title': 'Quiet zone',
        'price': 30
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 'offer-9',
        'title': 'GPS navigation',
        'price': 35
      },
      {
        'id': 'offer-10',
        'title': 'Additional driver',
        'price': 60
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'offer-11',
        'title': 'Cabin with sea view',
        'price': 350
      },
      {
        'id': 'offer-12',
        'title': 'Breakfast included',
        'price': 80
      },
      {
        'id': 'offer-13',
        'title': 'VIP lounge access',
        'price': 150
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 'offer-14',
        'title': 'Extra legroom',
        'price': 180
      },
      {
        'id': 'offer-15',
        'title': 'Priority boarding',
        'price': 70
      },
      {
        'id': 'offer-16',
        'title': 'Meal preference',
        'price': 40
      },
      {
        'id': 'offer-17',
        'title': 'Travel insurance',
        'price': 95
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 'offer-18',
        'title': 'Early check-in',
        'price': 65
      },
      {
        'id': 'offer-19',
        'title': 'Room upgrade',
        'price': 220
      },
      {
        'id': 'offer-20',
        'title': 'Welcome drink',
        'price': 20
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': 'offer-21',
        'title': 'Audio guide',
        'price': 18
      },
      {
        'id': 'offer-22',
        'title': 'Skip-the-line ticket',
        'price': 55
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 'offer-23',
        'title': 'Set dinner menu',
        'price': 120
      },
      {
        'id': 'offer-24',
        'title': 'Wine pairing',
        'price': 85
      },
      {
        'id': 'offer-25',
        'title': 'Window table reservation',
        'price': 40
      }
    ]
  }
];

const DESTINATION = [
  'Amsterdam',
  'Chamonix',
  'Geneva',
  'Moscow',
  'Singapore'
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

export {TYPE, MIN_PRICE, MAX_PRICE, DESCRIPTION, YEAR, LINK_FOTO, DESTINATION, EVENTS, OFFERS};

