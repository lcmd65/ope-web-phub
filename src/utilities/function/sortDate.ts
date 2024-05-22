export function convertDate(date: string) {
  var parts = date.split("/");
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1; // Months are 0-based, so subtract 1
  var year = parseInt(parts[2], 10);
  var dateMs = new Date(year, month, day);
  return dateMs;
}

export function sortDatesOldToNew(dateArray: string[]): string[] {
  return dateArray.sort((a, b) => {
    const dateA = convertDate(a);
    const dateB = convertDate(b);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  });
}
