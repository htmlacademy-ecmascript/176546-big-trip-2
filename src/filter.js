import {FilterType} from './const.js';
import dayjs from 'dayjs';

const isEventOverdue = (dueDate) => dueDate && dayjs(dueDate).isBefore(dayjs(), 'day');

const isEventUpcoming = (dueDate) => dueDate && dayjs(dueDate).isAfter(dayjs(), 'day');

const isEventPresent = (dueDateStart, dueDateEnd) => {
  const now = dayjs();

  return (now.isSame(dueDateStart, 'day') || now.isAfter(dueDateStart, 'day')) &&
         (now.isSame(dueDateEnd, 'day') || now.isBefore(dueDateEnd, 'day'));
};

const filter = {
  [FilterType.EVERYTHING]: ((events) => events),
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventUpcoming(event.dueDateStart)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isEventPresent(event.dueDateStart, event.dueDateEnd)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventOverdue(event.dueDateEnd)),
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
