import { FunctionComponent, useState, useEffect } from 'react';

import { Event, EventType, EventRepeatUnit, RepeatEvent } from '@/types/event';

import { Left, Right, Add } from '@/components/icons';
import EventAPI from '@/api/event';
import Week from './Week';
import EventInfo from './EventInfo';
import { formatDate } from '@/utils/dateFormat';
import Button from '@/components/Button';
import EditEvent from '@/components/EditEvent';

export enum ShowType {
  week,
  month,
  year,
}

const Calendar: FunctionComponent = () => {
  const [addModal, setAddModal] = useState(false);
  const [showType, setShowType] = useState(ShowType.week);
  const [dateRange, setDateRange] = useState({ startTime: 0, endTime: 0 });
  const [originalEventList, setOriginalEventList] = useState<Event[]>([]);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [originalEvent, setOriginalEvent] = useState<Event | null>(null);

  useEffect(() => { initDateRange(); }, [showType]);
  useEffect(() => { updateEventList(); }, [dateRange]);

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
  }

  function updateEventList() {
    if (!dateRange.startTime || !dateRange.endTime) { return; }
    EventAPI.GetEventList()
      .then((eventList) => {
        console.log('event list:', eventList);
        setOriginalEventList(eventList);
        parseEvent(eventList, dateRange.startTime, dateRange.endTime);
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

  function updateEventLastTime(nextTime: number) {
    if (!originalEvent || originalEvent.type !== EventType.repeat) { return; }

    const newEvent: RepeatEvent = { ...originalEvent };
    newEvent.lastTime = nextTime < new Date().getTime() ? new Date().getTime() : nextTime;
    EventAPI.UpdateEvent(newEvent).then(() => {
      EventAPI.GetEventByID(originalEvent.id).then((r) => {
        if (event && event.type === EventType.repeat && r.type === EventType.repeat) {
          setEvent({ ...event, lastTime: r.lastTime });
        }
        setOriginalEvent(r);

        originalEventList[originalEventList.findIndex((e) => e.id === r.id)] = r;
        setOriginalEventList([...originalEventList]);

        eventList.forEach((e) => {
          if (e.id === r.id && e.type === EventType.repeat && r.type === EventType.repeat) {
            e.lastTime = r.lastTime;
          }
        });
        setEventList([...eventList]);
      });
    });
  }

  function updateEvent(newEvent: Event) {
    if (!originalEvent || !event) { return; }

    const timeOffset = newEvent.startTime - originalEvent.startTime;
    EventAPI.UpdateEvent(newEvent).then(() => {
      EventAPI.GetEventByID(newEvent.id).then((r) => {
        if (r.id === originalEvent?.id && r.id === event?.id) {
          setEvent({ ...r, startTime: event.startTime + timeOffset });
          setOriginalEvent(r);
        }
      });
      updateEventList();
    });
  }

  return (<>
    <div className="my-2 mx-0.5 sm:my-4 sm:mx-4">
      <div className="relative text-center">
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
        <div className="absolute top-0 right-0">
          <Button className="px-0.5" click={() => { setAddModal(true); }}><Add></Add></Button>
        </div>
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
        <div className="mx-0.5 sm:mx-0">
          <EventInfo
            originalEvent={originalEvent}
            event={event}
            updateEventLastTime={updateEventLastTime}
            update={updateEvent}
          ></EventInfo>
        </div> : null
      }
    </div>
    {addModal ? <EditEvent show={addModal} close={() => { setAddModal(false); }}></EditEvent> : null}
  </>);
};

export default Calendar;
