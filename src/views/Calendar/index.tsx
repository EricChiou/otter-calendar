import { FunctionComponent, useEffect, useState } from 'react';

import { Event, EventType } from '@/types/event';

import EventAPI from '@/api/event';
import Calender from '@/components/Calendar';

const Home: FunctionComponent = () => {
  const [eventList, setEventList] = useState<Event[]>([]);

  function parseEvent(eventList: Event[], startTime: number, endTime: number) {
    console.log('11111');
    const newEventList: Event[] = [];
    eventList.forEach((event) => {
      if (event.type === EventType.single) {
        newEventList.push({
          ...event,
          type: EventType.single,
        });
      } else if (event.type === EventType.repeat) {
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
        <Calender eventList={eventList} dateRangeChanged={dateRangeChanged}></Calender>
      </div>
    </>
  );
};

export default Home;
