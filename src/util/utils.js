import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generateTwoDates(year) {
  const start = new Date(year, 0, 1).getTime();
  const end = new Date(year, 11, 31).getTime();
  const range = end - start;

  const t1 = start + Math.random() * range;
  const t2 = start + Math.random() * range;

  const [dateStart, dateEnd] = [Math.min(t1, t2), Math.max(t1, t2)].map((t) => new Date(t));

  return { dateStart, dateEnd };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomText(descriptions, shouldBeEmpty = true, length = 5) {
  if (shouldBeEmpty && Math.random() < 0.3) {
    return '';
  }

  return Array.from({ length: length }, () => getRandomArrayElement(descriptions)).join(' ');
}

function generateRandomImages(link, count = 5) {
  return Array.from({ length: count }, () => {
    const randomId = getRandomNumber(1, 999999);
    return link + randomId;
  });
}

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

  const formattedDays = String(days).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  let result = '';
  if (days > 0) {
    result += `${formattedDays}d `;
  }

  result += `${formattedHours}h ${formattedMinutes}m`;

  return result.trim();
}

export {
  getRandomArrayElement,
  generateTwoDates,
  getRandomNumber,
  generateRandomText,
  generateRandomImages,
  humanizeEventDueDate,
  formatDate,
  formatDateDiff,
};
