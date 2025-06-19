export function getNewId<T>(array: T[], idKey: keyof T): number {
  if (array.length === 0) return 1;

  const maxId = array.reduce((max, item) => {
    const id = item[idKey];
    if (typeof id !== 'number') {
      throw new Error(`Property "${String(idKey)}" is not a number.`);
    }
    return Math.max(max, id);
  }, 0);

  return maxId + 1;
}