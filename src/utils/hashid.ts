export const onewayID = (hashSize: number): string => {
  return Math.random().toString(36).substr(2, hashSize);
};
