import { EventRepeatUnit, RepeatEvent } from '@/types/event';

export function getEventNextTime(event: RepeatEvent): number {
  let nextTime = event.startTime;
  if (event.lastTime) {
    let count = 0, offset = 0;
    while (event.repeatTime < 1 || count <= event.repeatTime) {
      const date = new Date(event.startTime);
      switch (event.repeatUnit) {
        case EventRepeatUnit.day:
          offset = event.repeatInterval * count * 86400000;
          break;
        case EventRepeatUnit.week:
          offset = event.repeatInterval * count * 7 * 86400000;
          break;
        case EventRepeatUnit.month:
          date.setMonth(date.getMonth() + event.repeatInterval * count);
          offset = date.getTime() - event.startTime;
          break;
        case EventRepeatUnit.year:
          date.setFullYear(date.getFullYear() + event.repeatInterval * count);
          offset = date.getTime() - event.startTime;
          break;
      }
      nextTime = event.startTime + offset;
      count++;

      if (nextTime > event.lastTime) { break; }
    }
  }
  return nextTime;
}
