import { FunctionComponent, useState, useEffect } from 'react';

import { Event } from './interface';

import { Left, Right } from '@/components/icons';
import { formatDate } from '@/service/dateFormat';
import Week from './Week';

export enum ShowType {
  week,
  month,
  year,
}

type Props = {
  showType?: ShowType;
  eventList: Event[];
  dateRangeChanged?: (startTime: number, endTime: number) => void;
  selected?(event: Event): void;
}

const Calendar: FunctionComponent<Props> = ({
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
        <Week
          startTime={dateRange.startTime}
          eventList={eventList}
          selected={(event) => { if (selected) { selected(event); } }}
        ></Week> : null
      }
    </div>
  );
};

export default Calendar;
