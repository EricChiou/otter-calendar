import { FunctionComponent } from 'react';

import { EventType, EventRepeatUnit, Event } from '@/types/event';

import { formatDate } from '@/service/dateFormat';
import Button from '@/components/Button';

type Props = {
  event: Event;
}

const EventInfo: FunctionComponent<Props> = ({ event }) => {
  function renderEventType(): string {
    switch (event.type) {
      case EventType.single:
        return '單次';
      case EventType.repeat:
        return '重複';
    }
  }

  function renderEventRepeatInterval(): string {
    if (event.type === EventType.repeat) {
      return `${event.repeatInterval}${renderEventRepeatUnit()}`;
    }
    return '';
  }

  function renderEventRepeatUnit(): string {
    if (event.type === EventType.repeat) {
      switch (event.repeatUnit) {
        case EventRepeatUnit.day:
          return '天';
        case EventRepeatUnit.week:
          return '星期';
        case EventRepeatUnit.month:
          return '月';
        case EventRepeatUnit.year:
          return '年';
      }
    }
    return '';
  }

  const infoClassName = 'h-8';
  return (
    <div className="text-left">
      <span className="text-xl">{event.name}</span>
      <br></br>
      {formatDate(new Date(event.startTime), 'yyyy-MM-dd hh:mm')}
      <br></br>
      <div className={infoClassName}>
        事件類型： {renderEventType()}
      </div>
      {event.type === EventType.repeat ? <>
        <div className={infoClassName}>
          重複間隔： {renderEventRepeatInterval()}
        </div>
        <div className={infoClassName}>
          最後執行： {event.lastTime ? formatDate(new Date(event.lastTime), 'yyyy-MM-dd hh:mm') : null}
        </div>
        <div className={infoClassName}>
          下次執行： {formatDate(new Date(), 'yyyy-MM-dd hh:mm')}
        </div>
        <div className={infoClassName}>
          <Button text={'已執行'} click={(e) => { console.log(e); }}></Button>
        </div>
      </> : null}
    </div>
  );
};

export default EventInfo;
