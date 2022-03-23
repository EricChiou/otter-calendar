import { FunctionComponent, useState, useEffect } from 'react';

import { Event, EventType, EventRepeatUnit, RepeatEvent } from '@/types/event';

import { Left, Right } from '@/components/icons';
import EventAPI from '@/api/event';
import Week from './Week';
import EventInfo from './EventInfo';
import { formatDate } from '@/utils/dateFormat';

export enum ShowType {
  week,
  month,
  year,
}

const Calendar: FunctionComponent = () => {
  const [showType, setShowType] = useState(ShowType.week);
  const [dateRange, setDateRange] = useState({ startTime: 0, endTime: 0 });
  const [originalEventList, setOriginalEventList] = useState<Event[]>([]);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [originalEvent, setOriginalEvent] = useState<Event | null>(null);

  useEffect(() => { initDateRange(); }, []);
  function initDateRange() {
    const date = new Date();
    const newDateRange = { startTime: 0, endTime: 0 };
    switch (showType) {
      case ShowType.week:
        newDateRange.startTime = resetDate(date, (0 - date.getDay()) * 86400000);
        newDateRange.endTime = resetDate(date, (6 - date.getDay()) * 86400000);
        break;
      case ShowType.month:
        break;
      case ShowType.year:
        break;
    }

    setDateRange(newDateRange);
    dateRangeChanged(newDateRange.startTime, newDateRange.endTime);
  }

  function resetDate(date: Date, offsetTime: number): number {
    date.setTime(date.getTime() + offsetTime);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  }

  function updateDateRange(offsetTime: number) {
    setDateRange({
      startTime: dateRange.startTime + offsetTime,
      endTime: dateRange.endTime + offsetTime,
    });
    dateRangeChanged(dateRange.startTime + offsetTime, dateRange.endTime + offsetTime);
  }

  function dateRangeChanged(startTime: number, endTime: number) {
    EventAPI.GET_EVENT_LIST()
      .then((eventList) => {
        console.log('event list:', eventList);
        setOriginalEventList(eventList);
        parseEvent(eventList, startTime, endTime);
      });
  }

  function parseEvent(originalEventList: Event[], startTime: number, endTime: number) {
    const newEventList: Event[] = [];
    originalEventList.forEach((event) => {
      switch (event.type) {
        case EventType.single:
          newEventList.push({ ...event });
          break;
        case EventType.repeat: {
          let count = 0, offset = 0;
          while (event.repeatTime < 1 || count <= event.repeatTime) {
            const newEvent: Event = { ...event };
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
            newEvent.startTime = newEvent.startTime + offset;
            count++;

            if (newEvent.startTime >= startTime) { newEventList.push(newEvent); }
            if (newEvent.startTime > endTime) { break; }
          }
          break;
        }
      }
    });
    setEventList(newEventList);
  }

  function updateEvent() {
    if (!originalEvent || originalEvent.type !== EventType.repeat) { return; }
    originalEvent.lastTime = new Date().getTime();
    setOriginalEventList([...originalEventList]);
  }

  return (
    <div className="m-2 sm:m-4">
      <div className="text-center">
        <span
          className="inline-block p-1 align-middle cursor-pointer hover:bg-mask"
          onClick={() => { updateDateRange(-7 * 86400000); }}>
          <Left></Left>
        </span>
        <span className="text-xl align-middle">
          {formatDate(new Date(dateRange.startTime), 'yyyy MM/dd')}
          <span className="mx-2">-</span>
          {formatDate(new Date(dateRange.endTime), 'MM/dd')}
        </span>
        <span
          className="inline-block p-1 align-middle cursor-pointer hover:bg-mask"
          onClick={() => { updateDateRange(7 * 86400000); }}>
          <Right></Right>
        </span>
      </div>
      <Week
        dateRange={dateRange}
        eventList={eventList}
        selected={(e) => {
          setEvent(e);
          setOriginalEvent(originalEventList.find((originalEvent) => originalEvent.id === e.id) || null);
        }}
      ></Week>
      {event && originalEvent ?
        <EventInfo
          originalEvent={originalEvent}
          event={event}
          updateEvent={updateEvent}
        ></EventInfo> : null
      }
    </div>
  );
};

export default Calendar;
