import { FunctionComponent } from 'react';

import { formatDate } from '@/service/dateFormat';
import Button from '@/components/Button';

const eventInfoClass = 'my-0.5';
const EventRecords: FunctionComponent = () => {
  return (
    <div className="m-2 sm:m-4">
      <div className="text-2xl font-bold">事件執行紀錄</div>
      <div className="my-2">
        <hr></hr>
        <div className="py-1">
          <div className="text-xl">假事件</div>
          <div className={eventInfoClass}>最後執行: {formatDate(new Date(), 'yyyy-MM-dd hh:mm')}</div>
          <div className={eventInfoClass}>下次執行: {formatDate(new Date(new Date().getTime() + 1000000), 'yyyy-MM-dd hh:mm')}</div>
          <div className={eventInfoClass}><Button text={'已執行'} click={(e) => { console.log(e); }}></Button></div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default EventRecords;
