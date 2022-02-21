import { FunctionComponent, useState } from 'react';

import { Left, Right } from '@/components/icons';
import { formatDate } from '@/service/dateFormat';
import Week from './Week';
import EventInfo from './EventInfo';

enum ShowType {
  week,
  month,
  year,
}

export interface Event {
  id: number | string;
  name: string;
  startDate: Date;
  endDate: Date;
}

type Props = {
  dateRangeChanged?: (startTime: number, endTime: number) => void;
  eventList: Event[];
}

const Calendar: FunctionComponent<Props> = ({ dateRangeChanged, eventList }) => {
  const [showType, setShowType] = useState(ShowType.week);
  const [dateRange, setDateRange] = useState({
    startDate: resetDate((0 - new Date().getDay()) * 24 * 60 * 60 * 1000),
    endDate: resetDate((6 - new Date().getDay()) * 24 * 60 * 60 * 1000),
  });

  function resetDate(offsetTime: number): Date {
    const date = new Date();
    date.setTime(new Date().getTime() + offsetTime);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  function updateDateRange(startTime: number, endTime: number) {
    setDateRange({ startDate: new Date(startTime), endDate: new Date(endTime) });
    if (dateRangeChanged) { dateRangeChanged(startTime, endTime); }
  }

  return (
    <div className="text-center">
      <div>
        <span
          className="inline-block p-1 align-middle cursor-pointer"
          onClick={() => {
            const offset = -(7 * 24 * 60 * 60 * 1000);
            updateDateRange(dateRange.startDate.getTime() + offset, dateRange.endDate.getTime() + offset);
          }}>
          <Left></Left>
        </span>
        <span className="text-xl align-middle">
          {formatDate(dateRange.startDate, 'yyyy MM/dd')}
          <span className="mx-2">-</span>
          {formatDate(dateRange.endDate, 'MM/dd')}</span>
        <span
          className="inline-block p-1 align-middle cursor-pointer"
          onClick={() => {
            const offset = 7 * 24 * 60 * 60 * 1000;
            updateDateRange(dateRange.startDate.getTime() + offset, dateRange.endDate.getTime() + offset);
          }}>
          <Right></Right>
        </span>
      </div>
      {showType === ShowType.week ? <Week startDate={dateRange.startDate} eventList={eventList}></Week> : null}
      <div className="mt-2">
        <EventInfo></EventInfo>
      </div>
    </div>
  );
};

export default Calendar;
