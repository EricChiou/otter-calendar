import { FunctionComponent } from 'react';

import { formatDate } from '@/service/dateFormat';

type Props = {
  startDate: Date;
}

const Week: FunctionComponent<Props> = ({ startDate }) => {
  function renderEvent() {
    const style = 'm-1 px-1 text-white text-left bg-green-2 truncate cursor-pointer';
    const hoverStyle = 'hover:shadow-md';
    const activeStyle = 'active:shadow-none';

    return (
      <div className={`${style} ${hoverStyle} ${activeStyle}`}>Event</div>
    );
  }

  function renderDay(day: number): JSX.Element {
    const date = new Date(startDate.getTime() + day * 24 * 60 * 60 * 1000);
    return (
      <div className="w-[calc((100%-8px)/7)] text-mask-6">
        <div className="font-bold">
          {formatDate(date, 'MM/dd')}
          <br className='sm:hidden'></br>
          &nbsp;{formatDate(date, 'ww')}
        </div>
        {renderEvent()}
        {renderEvent()}
      </div>
    );
  }

  const divider = <div className="border-r border-mask-3"></div>;
  return (
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
    </div>
  );
};

export default Week;
