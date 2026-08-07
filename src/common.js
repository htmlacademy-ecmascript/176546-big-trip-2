function updateItem(items, update) {
  console.log(items);
  return items.map((item) => item.id === update.id ? update : item);
}

export {updateItem};
