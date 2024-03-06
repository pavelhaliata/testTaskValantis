import { Item } from '../api/types.ts';

export const uniqueItems = (array: Item[]) => {
  const idSet = new Set();
  return array.filter((item) => {
    if (!idSet.has(item.id)) {
      idSet.add(item.id);
      return true;
    }
    return false;
  });
};
