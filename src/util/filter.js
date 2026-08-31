import {FilterType} from '../const.js';
import dayjs from 'dayjs';

const isEventOverdue = (dueDate) => dueDate && dayjs(dueDate).isBefore(dayjs());

const isEventUpcoming = (dueDate) => dueDate && dayjs(dueDate).isAfter(dayjs());

const isEventPresent = (dateFrom, dateTo) => {
  const now = dayjs();
  return now.isAfter(dateFrom) && now.isBefore(dateTo);
};

const filter = {
  [FilterType.EVERYTHING]: (events) => events,

  [FilterType.FUTURE]: (events) => events.filter((event) =>
    isEventUpcoming(event.dateFrom)
  ),

  [FilterType.PRESENT]: (events) => events.filter((event) =>
    isEventPresent(event.dateFrom, event.dateTo)
  ),

  [FilterType.PAST]: (events) => events.filter((event) =>
    isEventOverdue(event.dateTo)
  ),
};

export {filter};
