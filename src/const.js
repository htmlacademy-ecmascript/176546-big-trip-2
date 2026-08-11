const MIN_BASE_PRICE = 100;
const MAX_BASE_PRICE = 1000;
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

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  price: 'price',
};

export {
  TYPE,
  MIN_BASE_PRICE,
  MAX_BASE_PRICE,
  DESCRIPTION,
  YEAR,
  LINK_FOTO,
  DESTINATION,
  OFFERS,
  FilterType,
  SortType
};

