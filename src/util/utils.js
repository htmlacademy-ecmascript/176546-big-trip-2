import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function humanizeEventDueDate(dueDate, dateFormat) {
  return dueDate ? dayjs(dueDate).format(dateFormat) : '';
}

function formatDate(date, withTime = false) {
  const d = dayjs(date);
  return withTime ? d.format('YYYY-MM-DDTHH:mm') : d.format('YYYY-MM-DD');
}

function formatDateDiff(date1, date2) {
  const newDate1 = dayjs(date1);
  const newDate2 = dayjs(date2);

  const diffMs = Math.abs(newDate1.diff(newDate2));
  const diff = dayjs.duration(diffMs);

  const days = Math.floor(diff.asDays());
  const hours = diff.hours();
  const minutes = diff.minutes();

  let result = '';

  if (days > 0) {
    result += `${String(days).padStart(2, '0')}D `;
  }

  if (hours > 0 || days > 0) {
    result += `${String(hours).padStart(2, '0')}H `;
  }

  if (days === 0 && hours === 0) {
    result = `${minutes}M`;
  } else {
    result += `${String(minutes).padStart(2, '0')}M`;
  }

  return result.trim();
}

const randomString = () => Math.random().toString(36).substring(2, 10);

export {
  humanizeEventDueDate,
  formatDate,
  formatDateDiff,
  randomString,
};
