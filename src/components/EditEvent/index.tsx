import { FunctionComponent, useState } from 'react';

import { Event, EventType } from '@/types/event';

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

  return (
    <Modal show={show} title="修改事件" close={() => { close(); }}>
      <div className="py-2 px-1.5">
        <div className="text-center">
          <div className="mb-3">{_event.name}</div>
          <Button click={() => { close(); }}>{event ? '修改' : '新增'}</Button>
          &nbsp;
          <Button click={() => { close(); }}>取消</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditEvent;
