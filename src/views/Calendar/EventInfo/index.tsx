import { FunctionComponent, useState } from 'react';

import { EventType, EventRepeatUnit, Event } from '@/types/event';

import { formatDate } from '@/utils/dateFormat';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

interface Props {
  originalEvent: Event;
  event: Event;
  updateEvent(): void;
}

const EventInfo: FunctionComponent<Props> = ({ originalEvent, event, updateEvent }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

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

  function getLastTime(): JSX.Element {
    if (originalEvent.type !== EventType.repeat) { return <></>; }
    return <>{originalEvent.lastTime ? formatDate(new Date(originalEvent.lastTime), 'yyyy-MM-dd hh:mm') : ''}</>;
  }

  function getNextTime(): JSX.Element {
    if (originalEvent.type !== EventType.repeat) { return <></>; }

    let nextTime = originalEvent.startTime;
    if (originalEvent.lastTime) {
      let count = 0, offset = 0;
      while (originalEvent.repeatTime < 1 || count <= originalEvent.repeatTime) {
        const date = new Date(originalEvent.startTime);
        switch (originalEvent.repeatUnit) {
          case EventRepeatUnit.day:
            offset = originalEvent.repeatInterval * count * 86400000;
            break;
          case EventRepeatUnit.week:
            offset = originalEvent.repeatInterval * count * 7 * 86400000;
            break;
          case EventRepeatUnit.month:
            date.setMonth(date.getMonth() + originalEvent.repeatInterval * count);
            offset = date.getTime() - originalEvent.startTime;
            break;
          case EventRepeatUnit.year:
            date.setFullYear(date.getFullYear() + originalEvent.repeatInterval * count);
            offset = date.getTime() - originalEvent.startTime;
            break;
        }
        nextTime = originalEvent.startTime + offset;
        count++;

        if (nextTime > originalEvent.lastTime) { break; }
      }
    }
    const nextTimeStr = formatDate(new Date(nextTime), 'yyyy-MM-dd hh:mm');
    return nextTime < new Date().getTime() ? <span className="text-red">{nextTimeStr}</span> : <>{nextTimeStr}</>;
  }

  const infoClassName = 'h-8 text-lg';
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
          重複間隔： {`${event.repeatInterval}${renderEventRepeatUnit()}`}
        </div>
        <div className={infoClassName}>
          重複次數： {event.repeatTime < 1 ? '永遠重複' : `${event.repeatTime}次`}
        </div>
        <div className={infoClassName}>
          最後執行： {getLastTime()}
        </div>
        <div className={infoClassName}>
          下次執行： {getNextTime()}&nbsp;
          <Button text={'已執行'} click={() => { updateEvent(); }}></Button>
        </div>
      </> : null}
      <div className={infoClassName}>
        備註： {event.remark}
      </div>
      <div className={infoClassName}>
        <Button text={'修改'}></Button>
        &nbsp;
        <Button className="bg-red active:bg-red-2" text={'刪除'} click={() => { setDeleteModal(true); }}></Button>
      </div>
      <Modal show={deleteModal} title="刪除事件" close={() => { setDeleteModal(false); }}>
        <div className="py-2 px-1.5">
          <div className="text-center">
            <div className="mb-3">確定刪除 {originalEvent.name}？</div>
            <Button className="bg-red active:bg-red-2" click={() => { setDeleteModal(false); }}>刪除</Button>
            &nbsp;
            <Button className="bg-gray active:bg-red-2" click={() => { setDeleteModal(false); }}>取消</Button>
          </div>
        </div>
      </Modal>
      <Modal show={deleteModal} title="修改事件" close={() => { setDeleteModal(false); }}>
        <div className="py-2 px-1.5">
          <div className="text-center">
            <div className="mb-3">確定刪除 {originalEvent.name}？</div>
            <Button className="bg-red active:bg-red-2" click={() => { setDeleteModal(false); }}>修改</Button>
            &nbsp;
            <Button click={() => { setDeleteModal(false); }}>取消</Button>
          </div>
        </div>
      </Modal>
    </div >
  );
};

export default EventInfo;
