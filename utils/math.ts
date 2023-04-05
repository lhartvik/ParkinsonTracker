export const sum = (ar: Array<number>) => ar.reduce((a, b) => a + b, 0);

export const mean = (ar: Array<number>) => sum(ar) / ar.length;

export const normalize = (ar: Array<number>) => {
  const gjennomsnitt = mean(ar);
  return ar.map(n => Math.abs(n - gjennomsnitt));
};
