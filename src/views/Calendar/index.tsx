import { FunctionComponent, useEffect, useState } from 'react';

import { Event } from '@/types/event';

import EventAPI from '@/api/event';
import Calender from '@/components/Calendar';

const Home: FunctionComponent = () => {
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    EventAPI.GET_EVENT_LIST()
      .then((eventList) => {
        console.log('event list:', eventList);
        setEventList(eventList);
      });
  }, []);

  return (
    <>
      <div className="m-2 sm:m-4">
        <Calender eventList={eventList}></Calender>
      </div>
    </>
  );
};

export default Home;
