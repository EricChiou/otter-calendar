import { FunctionComponent } from 'react';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import { Event } from '@/types/event';

interface Props {
  show: boolean;
  event: Event
  close(): void;
}

const DeleteEvent: FunctionComponent<Props> = ({ show, event, close }) => {
  return (
    <Modal show={show} title="刪除事件" close={close}>
      <div className="py-2 px-1.5">
        <div className="text-center">
          <div className="mb-3">確定刪除 {event.name}？</div>
          <Button className="bg-red active:bg-red-2" click={close}>刪除</Button>
          &nbsp;
          <Button click={close}>取消</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEvent;
