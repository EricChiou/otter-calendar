import { FunctionComponent, useState, useEffect } from 'react';

import { Event } from '@/types/event';

import { Left, Right } from '@/components/icons';
import { formatDate } from '@/service/dateFormat';

export enum ShowType {
  week,
  month,
  year,
}

interface Props {
  showType?: ShowType;
  eventList: Event[];
  dateRangeChanged?: (startTime: number, endTime: number) => void;
  selected(event: Event): void;
}

const Week: FunctionComponent<Props> = ({
  showType = ShowType.week,
  eventList,
  dateRangeChanged,
  selected,
}) => {
  const [dateRange, setDateRange] = useState({ startTime: 0, endTime: 0 });

  useEffect(() => { initDateRange(); }, []);

  function initDateRange() {
    const date = new Date();
    let newDateRange = { startTime: 0, endTime: 0 };

    if (showType === ShowType.week) {
      newDateRange = {
        startTime: resetDate(date, (0 - date.getDay()) * 86400000),
        endTime: resetDate(date, (6 - date.getDay()) * 86400000),
      };
    }

    setDateRange(newDateRange);
    if (dateRangeChanged) { dateRangeChanged(newDateRange.startTime, newDateRange.endTime); }
  }

  function resetDate(date: Date, offsetTime: number): number {
    date.setTime(date.getTime() + offsetTime);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  }

  function updateDateRange(startTime: number, endTime: number) {
    setDateRange({ startTime, endTime });
    if (dateRangeChanged) { dateRangeChanged(startTime, endTime); }
  }

  function renderEvent(event: Event) {
    const style = 'm-1 px-1 text-white text-left bg-green-2 truncate cursor-pointer';
    const hoverStyle = 'hover:shadow-md';
    const activeStyle = 'active:shadow-none';

    return (
      <div
        key={event.id}
        className={`${style} ${hoverStyle} ${activeStyle}`}
        onClick={() => { selected(event); }}
      >{event.name}</div>
    );
  }

  function renderDay(day: number): JSX.Element {
    const date = new Date(dateRange.startTime + day * 86400000);
    return (
      <div className="w-[calc((100%-8px)/7)] text-mask-6">
        <div className="font-bold">
          {formatDate(date, 'MM/dd')}
          <br className='sm:hidden'></br>
          &nbsp;{formatDate(date, 'ww')}
        </div>
        {eventList.map((event) => {
          if (
            event.startTime >= date.getTime() &&
            event.startTime < date.getTime() + 86400000
          ) {
            return renderEvent(event);
          }
          return null;
        })}
      </div>
    );
  }

  const divider = <div className="border-r border-mask-3"></div>;
  return (
    <div className="text-center">
      <div>
        <span
          className="inline-block p-1 align-middle cursor-pointer"
          onClick={() => {
            const offset = -(7 * 86400000);
            updateDateRange(dateRange.startTime + offset, dateRange.endTime + offset);
          }}>
          <Left></Left>
        </span>
        <span className="text-xl align-middle">
          {formatDate(new Date(dateRange.startTime), 'yyyy MM/dd')}
          <span className="mx-2">-</span>
          {formatDate(new Date(dateRange.endTime), 'MM/dd')}</span>
        <span
          className="inline-block p-1 align-middle cursor-pointer"
          onClick={() => {
            const offset = 7 * 86400000;
            updateDateRange(dateRange.startTime + offset, dateRange.endTime + offset);
          }}>
          <Right></Right>
        </span>
      </div>
      {showType === ShowType.week ?
        <div className="flex min-h-[15rem]">
          {divider}
          {renderDay(0)}
          {divider}
          {renderDay(1)}
          {divider}
          {renderDay(2)}
          {divider}
          {renderDay(3)}
          {divider}
          {renderDay(4)}
          {divider}
          {renderDay(5)}
          {divider}
          {renderDay(6)}
          {divider}
        </div> : null
      }
    </div>
  );
};

export default Week;
