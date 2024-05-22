export function getCurrentWeek(): number {
  const currentDate: Date = new Date();
  const startDate: Date = new Date(currentDate.getFullYear(), 0, 1);
  const days: number = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber: number = Math.ceil(days / 7);

  return weekNumber;
}
