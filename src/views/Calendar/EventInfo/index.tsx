import { FunctionComponent } from 'react';

import { EventType, EventRepeatUnit, Event, RepeatEvent } from '@/types/event';

import { formatDate } from '@/service/dateFormat';
import Button from '@/components/Button';

interface Props {
  event: Event;
  updateEvent(event: RepeatEvent): void;
}

const EventInfo: FunctionComponent<Props> = ({ event, updateEvent }) => {
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

  function getNextTime(): string {
    if (event.type !== EventType.repeat) { return ''; }
    if (!event.lastTime) { return formatDate(new Date(event.startTime), 'yyyy-MM-dd hh:mm'); }

    let count = 0;
    let offset = 0;
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
      const nextTime = event.startTime + offset;
      count++;

      if (nextTime > event.lastTime) {
        return formatDate(new Date(nextTime), 'yyyy-MM-dd hh:mm');
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
          重複次數： {event.repeatTime < 1 ? '永遠重複' : `${event.repeatTime}次`}
        </div>
        <div className={infoClassName}>
          最後執行： {event.lastTime ? formatDate(new Date(event.lastTime), 'yyyy-MM-dd hh:mm') : null}
        </div>
        <div className={infoClassName}>
          下次執行： {getNextTime()}
        </div>
        <div className={infoClassName}>
          <Button text={'已執行'} click={() => { updateEvent(event); }}></Button>
        </div>
      </> : null}
    </div>
  );
};

export default EventInfo;
