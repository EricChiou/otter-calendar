import { ChangeEvent, FunctionComponent, useState } from 'react';

import { Event, EventType, eventTypes, EventRepeatUnit } from '@/types/event';

import Modal from '@/components/Modal';
import Button from '@/components/Button';

interface Props {
  show: boolean;
  event?: Event
  close(): void;
}

const EditEvent: FunctionComponent<Props> = ({ show, event, close }) => {
  const [_event, setEvent] = useState<Event>(event ?
    { ...event } :
    {
      id: 0,
      name: '',
      type: EventType.single,
      startTime: 0,
      remark: '',
    });

  function eventTypeOnChange(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case EventType.single:
        setEvent({
          id: _event.id,
          name: _event.name,
          type: EventType.single,
          startTime: _event.startTime,
          remark: _event.remark,
        });
        break;
      case EventType.repeat:
        setEvent({
          ..._event,
          type: EventType.repeat,
          repeatInterval: 1,
          repeatUnit: EventRepeatUnit.day,
          repeatTime: 1,
          lastTime: null,
        });
        break;
    }
  }

  return (
    <Modal show={show} title={`${event ? '修改' : '新增'}事件`} close={() => { close(); }}>
      <div className="py-2 px-1.5">
        <div className="text-center">
          <div className="mb-3">
            <input
              className="px-1 w-62 border border-mask-5 outline-none"
              placeholder="事件名稱"
              value={_event.name}
              onChange={(e) => { setEvent({ ..._event, name: e.target.value }); }}
            ></input>
          </div>
          <div className="mb-3 text-left">
            事件類型：
            <select className="border border-mask-5 outline-none" value={_event.type} onChange={eventTypeOnChange}>
              {eventTypes.map((eventType) => (
                <option key={eventType.value} value={eventType.value}>{eventType.label}</option>
              ))}
            </select>
          </div>
          {_event.type === EventType.repeat ? <>
            <div className="mb-3 text-left">
              重複間隔：
            </div>
            <div className="mb-3 text-left">
              重複次數：
            </div>
          </> : null}
          <div className="mb-3 text-left">
            開始日期：
          </div>
          <Button click={() => { close(); }}>{event ? '修改' : '新增'}</Button>
          &nbsp;
          <Button click={() => { close(); }}>取消</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditEvent;
