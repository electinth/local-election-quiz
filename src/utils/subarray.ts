export default function getRandomSubarray<T>(arr: T[], size: number): T[] {
  let i = arr.length,
    temp,
    index;

  const shuffled = arr.slice(0),
    min = i - size;

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }

  return shuffled.slice(min);
}
