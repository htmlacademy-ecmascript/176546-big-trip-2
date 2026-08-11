const sortEventDay = (eventA, eventB) =>
  new Date(eventA.dateFrom) - new Date(eventB.dateFrom);

const sortEventTime = (eventA, eventB) => {
  const durationA = new Date(eventA.dateTo) - new Date(eventA.dateFrom);
  const durationB = new Date(eventB.dateTo) - new Date(eventB.dateFrom);
  return durationB - durationA;
};

const sortEventbasePrice = (eventA, eventB) =>
  eventB.basePrice - eventA.basePrice;

export {sortEventDay, sortEventTime, sortEventbasePrice};
