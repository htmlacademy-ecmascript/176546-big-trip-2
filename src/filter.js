import {FilterType} from './const.js';
import dayjs from 'dayjs';

const isEventOverdue = (dueDate) => {
  return dueDate && dayjs(dueDate).isBefore(dayjs(), 'day');
};

const isEventUpcoming = (dueDate) => {
  return dueDate && dayjs(dueDate).isAfter(dayjs(), 'day');
};

const isEventExpiringToday = (dueDate) => {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'day');
};

const filter = {
  [FilterType.EVERYTHING]: ((events) => events),
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventUpcoming(event.dueDateStart)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventExpiringToday(event.dueDateStart)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventOverdue(event.dueDateStart)),
};

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    }),
  );
}

export {generateFilter};
