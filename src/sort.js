const sortEventDay = (eventA, eventB) =>
  new Date(eventA.dueDateStart) - new Date(eventB.dueDateStart);

const sortEventTime = (eventA, eventB) => {
  const durationA = new Date(eventA.dueDateEnd) - new Date(eventA.dueDateStart);
  const durationB = new Date(eventB.dueDateEnd) - new Date(eventB.dueDateStart);
  return durationB - durationA;
};

const sortEventPrice = (eventA, eventB) =>
  eventB.price - eventA.price;

export {sortEventDay, sortEventTime, sortEventPrice};
