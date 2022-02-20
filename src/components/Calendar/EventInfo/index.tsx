import { FunctionComponent } from 'react';

import { formatDate } from '@/service/dateFormat';
import Button from '@/components/Button';

interface BaseEvent {
  name: string;
  time: number;
}

interface SingleEvent extends BaseEvent {
  type: 'single';
}

interface RepeatEvent extends BaseEvent {
  type: 'repeat';
  repeatUnit: 'day' | 'week' | 'month' | 'year';
  repeatInterval: number;
  lastTime: number;
  nextTime: number;
}

type Event = SingleEvent | RepeatEvent;

const EventInfo: FunctionComponent = () => {
  const mockEvent: Event = {
    name: '假事件',
    time: Date.now(),
    type: 'repeat',
    repeatUnit: 'day',
    repeatInterval: 7,
    lastTime: Date.now() - 1000000,
    nextTime: Date.now() + 1000000,
  };

  function renderEventType(): string {
    switch (mockEvent.type) {
      case 'single':
        return '單次';
      case 'repeat':
        return '重複';
    }
  }

  function renderEventRepeatInterval(): string {
    if (mockEvent.type === 'repeat') {
      return `${mockEvent.repeatInterval}${renderEventRepeatUnit()}`;
    }
    return '';
  }

  function renderEventRepeatUnit(): string {
    if (mockEvent.type === 'repeat') {
      switch (mockEvent.repeatUnit) {
        case 'day':
          return '天';
        case 'week':
          return '星期';
        case 'month':
          return '月';
        case 'year':
          return '年';
      }
    }
    return '';
  }

  const infoClassName = 'h-8';
  return (
    <div className="text-left">
      <span className="text-xl">{mockEvent.name}</span>
      <br></br>
      {formatDate(new Date(mockEvent.time), 'yyyy-MM-dd hh:mm')}
      <br></br>
      <div className={infoClassName}>
        事件類型： {renderEventType()}
      </div>
      {mockEvent.type === 'repeat' ? <>
        <div className={infoClassName}>
          重複間隔： {renderEventRepeatInterval()}
        </div>
        <div className={infoClassName}>
          最後執行： {formatDate(new Date(mockEvent.lastTime), 'yyyy-MM-dd hh:mm')}
        </div>
        <div className={infoClassName}>
          下次執行： {formatDate(new Date(mockEvent.nextTime), 'yyyy-MM-dd hh:mm')}
        </div>
        <div className={infoClassName}>
          <Button text={'已執行'} click={(e) => { console.log(e); }}></Button>
        </div>
      </> : null}
    </div>
  );
};

export default EventInfo;
