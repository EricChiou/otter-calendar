import { FunctionComponent, useState } from 'react';

import { Event as CalendarEvent } from '@/components/Calendar/interface';
import { Event, EventType, EventRepeatUnit } from '@/types/event';

import EventAPI from '@/api/event';
import Calender from '@/components/Calendar';
import EventInfo from './EventInfo';

const Home: FunctionComponent = () => {
  const [eventList, setEventList] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  function parseEvent(eventList: Event[], startTime: number, endTime: number) {
    const newEventList: CalendarEvent[] = [];
    eventList.forEach((event) => {
      switch (event.type) {
        case EventType.single:
          newEventList.push({ ...event });
          break;
        case EventType.repeat: {
          let count = 0;
          let offset = 0;
          while (event.repeatTime < 1 || count <= event.repeatTime) {
            const newEvent: CalendarEvent = { ...event };
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
            newEvent.endTime = newEvent.endTime + offset;
            count++;

            if (newEvent.startTime >= startTime) { newEventList.push(newEvent); }
            if (newEvent.startTime > endTime || count > 30) { break; }
          }
          break;
        }
      }
    });
    setEventList(newEventList);
  }

  function dateRangeChanged(startTime: number, endTime: number) {
    EventAPI.GET_EVENT_LIST()
      .then((eventList) => {
        console.log('event list:', eventList);
        parseEvent(eventList, startTime, endTime);
      });
  }

  return (
    <>
      <div className="m-2 sm:m-4">
        <Calender
          eventList={eventList}
          dateRangeChanged={dateRangeChanged}
          selected={(event) => { setSelectedEvent(event as Event); }}
        ></Calender>
        {selectedEvent ? <EventInfo event={selectedEvent}></EventInfo> : null}
      </div>
    </>
  );
};

export default Home;
