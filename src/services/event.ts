import { EventRepeatUnit, RepeatEvent, EventCalType } from '@/types/event';

function getByStartNextTime(event: RepeatEvent): number {
  let nextTime = event.startTime;
  if (event.lastTime) {
    let count = 0, offsetTime = 0;
    while (event.repeatTime < 1 || count <= event.repeatTime) {
      const date = new Date(event.startTime);
      switch (event.repeatUnit) {
        case EventRepeatUnit.day:
          offsetTime = event.repeatInterval * count * 86400000;
          break;
        case EventRepeatUnit.week:
          offsetTime = event.repeatInterval * count * 7 * 86400000;
          break;
        case EventRepeatUnit.month:
          date.setMonth(date.getMonth() + event.repeatInterval * count);
          offsetTime = date.getTime() - event.startTime;
          break;
        case EventRepeatUnit.year:
          date.setFullYear(date.getFullYear() + event.repeatInterval * count);
          offsetTime = date.getTime() - event.startTime;
          break;
      }
      nextTime = event.startTime + offsetTime;
      count++;

      if (nextTime > event.lastTime) { break; }
    }
  }
  return nextTime;
}

function getByLastNextTime(event: RepeatEvent): number {
  let offsetTime = 0;
  const date = new Date(event.startTime);
  switch (event.repeatUnit) {
    case EventRepeatUnit.day:
      offsetTime = event.repeatInterval * 86400000;
      break;
    case EventRepeatUnit.week:
      offsetTime = event.repeatInterval * 7 * 86400000;
      break;
    case EventRepeatUnit.month:
      date.setMonth(date.getMonth() + event.repeatInterval);
      offsetTime = date.getTime() - event.startTime;
      break;
    case EventRepeatUnit.year:
      date.setFullYear(date.getFullYear() + event.repeatInterval);
      offsetTime = date.getTime() - event.startTime;
      break;
  }
  return (event.lastTime || event.startTime) + offsetTime;
}

export function getEventNextTime(event: RepeatEvent): number {
  if (event.calType === EventCalType.byStart) {
    return getByStartNextTime(event);
  }
  if (event.calType === EventCalType.byLast) {
    return getByLastNextTime(event);
  }
  return event.startTime;
}
