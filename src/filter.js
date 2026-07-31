import {FilterType} from './const.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: ((events) => events),
  [FilterType.FUTURE]: (events) => events.filter((event) => isTaskUpcoming(event.dueDateStart)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isTaskExpiringToday(event.dueDateStart)),
  [FilterType.PAST]: (events) => events.filter((event) => isTaskOverdue(event.dueDateStart)),
};

function isTaskOverdue(dueDate) {
  return dueDate && dayjs(dueDate).isBefore(dayjs(), 'day');
}

function isTaskUpcoming(dueDate) {
  return dueDate && dayjs(dueDate).isAfter(dayjs(), 'day');
}

function isTaskExpiringToday(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'day');
}

function generateFilter(events) {
  return Object.entries(filter).map(
    ([filterType, filterEvents]) => ({
      type: filterType,
      count: filterEvents(events).length,
    }),
  );
}

export {generateFilter};
