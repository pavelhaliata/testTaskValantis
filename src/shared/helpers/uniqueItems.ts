import { Product } from '../types';

export const uniqueItems = (array: Product[]) => {
  const idSet = new Set();
  return array.filter((item) => {
    if (!idSet.has(item.id)) {
      idSet.add(item.id);
      return true;
    }
    return false;
  });
};
