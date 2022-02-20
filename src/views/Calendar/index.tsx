import { FunctionComponent, useEffect } from 'react';

import EventAPI from '@/api/event';
import Calender from '@/components/Calendar';

const Home: FunctionComponent = () => {
  useEffect(() => {
    EventAPI.GET_EVENT_LIST()
      .then((eventList) => {
        console.log('event list:', eventList);
      });
  }, []);

  return (
    <>
      <div className="m-2 sm:m-4">
        <Calender></Calender>
      </div>
    </>
  );
};

export default Home;
