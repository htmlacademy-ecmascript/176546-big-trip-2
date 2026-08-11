import {FilterType} from '../const.js';
import dayjs from 'dayjs';

const isEventOverdue = (dueDate) => dueDate && dayjs(dueDate).isBefore(dayjs(), 'day');

const isEventUpcoming = (dueDate) => dueDate && dayjs(dueDate).isAfter(dayjs(), 'day');

const isEventPresent = (dateFrom, dateTo) => {
  const now = dayjs();

  return (now.isSame(dateFrom, 'day') || now.isAfter(dateFrom, 'day')) &&
         (now.isSame(dateTo, 'day') || now.isBefore(dateTo, 'day'));
};

const filter = {
  [FilterType.EVERYTHING]: ((events) => events),
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventUpcoming(event.dateFrom)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventPresent(event.dateFrom, event.dateTo)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventOverdue(event.dateTo)),
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
