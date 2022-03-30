import { FunctionComponent, useState } from 'react';

import { EventType, EventRepeatUnit, Event } from '@/types/event';

import { formatDate } from '@/utils/dateFormat';
import Button from '@/components/Button';
import EditEvent from '@/components/EditEvent';
import DeleteEvent from '@/components/DeleteEvent';
import { getEventNextTime } from '@/utils/event';

interface Props {
  originalEvent: Event;
  event: Event;
  updateEventLastTime(nextTime: number): void;
  update(event: Event): void;
}

const EventInfo: FunctionComponent<Props> = ({ originalEvent, event, updateEventLastTime, update }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  function renderEventType(): string {
    switch (event.type) {
      case EventType.single:
        return '單次執行';
      case EventType.repeat:
        return '重複';
    }
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

  function renderLastTime(): JSX.Element {
    if (originalEvent.type !== EventType.repeat) { return <></>; }
    return <>{originalEvent.lastTime ? formatDate(new Date(originalEvent.lastTime), 'yyyy-MM-dd hh:mm') : ''}</>;
  }

  function renderNextTime(): JSX.Element {
    if (originalEvent.type !== EventType.repeat) { return <></>; }

    const nextTime = getEventNextTime(originalEvent);
    return (
      <span className={`${nextTime < new Date().getTime() ? 'text-red' : ''}`}>
        {formatDate(new Date(nextTime), 'yyyy-MM-dd hh:mm')}
      </span>
    );
  }

  const infoClassName = 'h-8 text-lg';
  return (<>
    <div className="text-left">
      <span className="text-xl">{event.name}</span>
      <br></br>
      {formatDate(new Date(event.startTime), 'yyyy-MM-dd hh:mm')}
      <br></br>
      <div className={infoClassName}>
        事件類型： {renderEventType()}
      </div>
      {event.type === EventType.repeat && originalEvent.type === EventType.repeat ? <>
        <div className={infoClassName}>
          重複間隔： {`${event.repeatInterval}${renderEventRepeatUnit()}`}
        </div>
        <div className={infoClassName}>
          重複次數： {event.repeatTime < 1 ? '永遠重複' : `${event.repeatTime}次`}
        </div>
        <div className={infoClassName}>
          最後執行： {renderLastTime()}
        </div>
        <div className={infoClassName}>
          下次執行： {renderNextTime()}&nbsp;
          <Button text={'已執行'} click={() => { updateEventLastTime(getEventNextTime(originalEvent)); }}></Button>
        </div>
      </> : null}
      <div className={infoClassName}>
        備註： {event.remark}
      </div>
      <div className={infoClassName}>
        <Button text={'修改'} click={() => { setEditModal(true); }}></Button>
        &nbsp;
        <Button className="bg-red active:bg-red-2" text={'刪除'} click={() => { setDeleteModal(true); }}></Button>
      </div>
    </div >
    {editModal ?
      <EditEvent
        show={editModal}
        event={originalEvent}
        close={() => { setEditModal(false); }}
        update={update}
      ></EditEvent> : null}
    {deleteModal ?
      <DeleteEvent show={deleteModal} event={originalEvent} close={() => { setDeleteModal(false); }}></DeleteEvent> :
      null}
  </>);
};

export default EventInfo;
