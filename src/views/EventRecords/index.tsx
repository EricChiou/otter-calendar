import { FunctionComponent, useEffect, useState } from 'react';

import { Event, EventType, EventRepeatUnit } from '@/types/event';

import { formatDate } from '@/utils/dateFormat';
import Button from '@/components/Button';
import EventAPI from '@/api/event';

const EventRecords: FunctionComponent = () => {
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    EventAPI.GET_EVENT_LIST()
      .then((eventList) => {
        console.log('event list:', eventList);
        setEventList(eventList.filter((event) => event.type === EventType.repeat));
      });
  }, []);

  function updateEvent(event: Event) {
    if (event.type !== EventType.repeat) { return; }
    event.lastTime = new Date().getTime();
    setEventList([...eventList]);
  }

  function getNextTime(event: Event): JSX.Element {
    if (event.type !== EventType.repeat) { return <></>; }

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
    const nextTimeStr = formatDate(new Date(nextTime), 'yyyy-MM-dd hh:mm');
    return nextTime < new Date().getTime() ? <span className="text-red">{nextTimeStr}</span> : <>{nextTimeStr}</>;
  }

  function renderEventRecords(event: Event): JSX.Element {
    if (event.type !== EventType.repeat) { return <></>; }
    return (
      <div key={event.id}>
        <div className="py-1">
          <div className="text-xl">假事件</div>
          <div className="my-0.5">
            最後執行: {event.lastTime ? formatDate(new Date(event.lastTime), 'yyyy-MM-dd hh:mm') : ''}
          </div>
          <div className="my-0.5">
            下次執行: {getNextTime(event)}
            &nbsp;<Button text={'已執行'} click={(e) => { updateEvent(event); }}></Button>
          </div>
          <div className="my-0.5">
            備註： {event.remark}
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }

  return (
    <div className="m-2 sm:m-4">
      <div className="text-2xl font-bold">事件執行紀錄</div>
      <div className="my-2">
        <hr></hr>
        {eventList.map((event) => renderEventRecords(event))}
      </div>
    </div>
  );
};

export default EventRecords;
