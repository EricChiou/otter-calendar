export function formatDate(date: Date, format: string): string {
  function parseWeek(date: Date): string {
    switch (date.getDay()) {
      case 0:
        return 'Sun.';
      case 1:
        return 'Mon.';
      case 2:
        return 'Tue.';
      case 3:
        return 'Wed.';
      case 4:
        return 'Thu.';
      case 5:
        return 'Fri.';
      case 6:
        return 'Sat.';
      default:
        return `${date.getDay()}`;
    }
  }

  let result = format;
  result = result.replace('yyyy', `${date.getFullYear()}`);
  result = result.replace('MM', `${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`);
  result = result.replace('dd', `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`);
  result = result.replace('hh', `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}`);
  result = result.replace('mm', `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`);
  result = result.replace('ss', `${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`);
  result = result.replace('ww', parseWeek(date));
  return result;
}
