import { FunctionComponent, useState } from 'react';

import { EventType, EventRepeatUnit, Event } from '@/types/event';

import { formatDate } from '@/service/dateFormat';
import Button from '@/components/Button';

type Props = {
  event: Event;
}

const EventInfo: FunctionComponent<Props> = ({ event }) => {
  const [selectedEvent, setSelectedEvent] = useState(event);

  function renderEventType(): string {
    switch (selectedEvent.type) {
      case EventType.single:
        return '單次';
      case EventType.repeat:
        return '重複';
    }
  }

  function renderEventRepeatInterval(): string {
    if (selectedEvent.type === EventType.repeat) {
      return `${selectedEvent.repeatInterval}${renderEventRepeatUnit()}`;
    }
    return '';
  }

  function renderEventRepeatUnit(): string {
    if (selectedEvent.type === EventType.repeat) {
      switch (selectedEvent.repeatUnit) {
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
    if (selectedEvent.type !== EventType.repeat) { return ''; }
    if (!selectedEvent.lastTime) { return formatDate(new Date(selectedEvent.startTime), 'yyyy-MM-dd hh:mm'); }

    let count = 0;
    let offset = 0;
    while (selectedEvent.repeatTime < 1 || count <= selectedEvent.repeatTime) {
      const date = new Date(selectedEvent.startTime);
      switch (selectedEvent.repeatUnit) {
        case EventRepeatUnit.day:
          offset = selectedEvent.repeatInterval * count * 86400000;
          break;
        case EventRepeatUnit.week:
          offset = selectedEvent.repeatInterval * count * 7 * 86400000;
          break;
        case EventRepeatUnit.month:
          date.setMonth(date.getMonth() + selectedEvent.repeatInterval * count);
          offset = date.getTime() - selectedEvent.startTime;
          break;
        case EventRepeatUnit.year:
          date.setFullYear(date.getFullYear() + selectedEvent.repeatInterval * count);
          offset = date.getTime() - selectedEvent.startTime;
          break;
      }
      const nextTime = selectedEvent.startTime + offset;
      count++;

      if (nextTime > selectedEvent.lastTime) {
        return formatDate(new Date(nextTime), 'yyyy-MM-dd hh:mm');
      }
    }
    return '';
  }

  const infoClassName = 'h-8';
  return (
    <div className="text-left">
      <span className="text-xl">{selectedEvent.name}</span>
      <br></br>
      {formatDate(new Date(selectedEvent.startTime), 'yyyy-MM-dd hh:mm')}
      <br></br>
      <div className={infoClassName}>
        事件類型： {renderEventType()}
      </div>
      {selectedEvent.type === EventType.repeat ? <>
        <div className={infoClassName}>
          重複間隔： {renderEventRepeatInterval()}
        </div>
        <div className={infoClassName}>
          最後執行： {selectedEvent.lastTime ? formatDate(new Date(selectedEvent.lastTime), 'yyyy-MM-dd hh:mm') : null}
        </div>
        <div className={infoClassName}>
          下次執行： {getNextTime()}
        </div>
        <div className={infoClassName}>
          <Button text={'已執行'} click={() => {
            const newEvent = { ...selectedEvent };
            newEvent.lastTime = new Date().getTime();
            setSelectedEvent(newEvent);
          }}></Button>
        </div>
      </> : null}
    </div>
  );
};

export default EventInfo;
