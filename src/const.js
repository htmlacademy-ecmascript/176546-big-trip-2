const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const YEAR = 2026;
const LINK_FOTO = 'https://loremflickr.com/248/152?random=';

const TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Drive',
  'Ship',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const OFFERS = [
  { id: 'offer-001', title: 'Order Uber', type: 'Taxi' },
  { id: 'offer-002', title: 'Add luggage', type: 'Taxi' },
  { id: 'offer-003', title: 'Switch to comfort', type: 'Bus' },
  { id: 'offer-004', title: 'Book tickets', type: 'Bus' },
  { id: 'offer-005', title: 'Travel by train', type: 'Train' },
  { id: 'offer-006', title: 'Choose seats', type: 'Train' },
  { id: 'offer-007', title: 'Add meal', type: 'Train' },
  { id: 'offer-008', title: 'Rent a car', type: 'Drive' },
  { id: 'offer-009', title: 'Add luggage', type: 'Ship' },
  { id: 'offer-010', title: 'Lunch in city', type: 'Ship' },
  { id: 'offer-011', title: 'Add breakfast', type: 'Flight' },
  { id: 'offer-012', title: 'Add meal', type: 'Flight' },
  { id: 'offer-013', title: 'Book tickets', type: 'Flight' },
  { id: 'offer-014', title: 'Add breakfast', type: 'Check-in' },
  { id: 'offer-015', title: 'Lunch in city', type: 'Check-in' },
  { id: 'offer-016', title: 'Book tickets', type: 'Sightseeing' },
  { id: 'offer-017', title: 'Lunch in city', type: 'Sightseeing' },
  { id: 'offer-018', title: 'Add breakfast', type: 'Restaurant' },
  { id: 'offer-019', title: 'Add meal', type: 'Restaurant' },
  { id: 'offer-020', title: 'Lunch in city', type: 'Restaurant' }
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

export {TYPE, DESTINATION, MIN_PRICE, MAX_PRICE, DESCRIPTION, YEAR, LINK_FOTO, OFFERS};

