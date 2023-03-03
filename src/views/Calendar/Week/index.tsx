import { FunctionComponent } from 'react';

import { Event, EventType } from '@/types/event';

import { formatDate } from '@/utils/dateFormat';
import { getEventNextTime } from '@/services/event';

interface Props {
  dateRange: { startTime: number, endTime: number };
  eventList: Event[];
  selected(event: Event): void;
}

const Week: FunctionComponent<Props> = ({
  dateRange,
  eventList,
  selected,
}) => {
  function renderEvent(event: Event) {
    const style = 'my-1 mx-0.5 px-1 text-white text-left bg-green-2 truncate cursor-pointer sm:mx-1';
    const hoverStyle = 'hover:shadow-md';
    const activeStyle = 'active:shadow-none';
    const nextTime = event.type === EventType.repeat ? getEventNextTime(event) : 0;

    return (
      <div
        key={event.id}
        className={`${style} ${hoverStyle} ${activeStyle}`}
        onClick={() => { selected(event); }}
      >
        {nextTime && nextTime < new Date().getTime() && <span className="text-red">！</span>}
        {event.name}
      </div>
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
    <div className="flex min-h-[15rem] text-center">
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
    </div>
  );
};

export default Week;
