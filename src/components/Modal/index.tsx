import { FunctionComponent } from 'react';

import { Close } from '@/components/icons';
import Button from '@/components/Button';

interface Props {
  show: boolean;
  title?: string;
  close?(): void;
}

const Modal: FunctionComponent<Props> = ({ children, show, title, close }) => {
  return (<>{show ?
    <div className="fixed top-0 right-0 bottom-0 left-0 text-center bg-mask-3 z-50">
      <div className="inline-block h-[100%] align-middle"></div>
      <div className="inline-block min-w-[12rem] text-left align-middle">
        <div className="relative py-1 px-1.5 text-white bg-green-2">
          {title}
          <Button
            className="absolute top-0 right-0 py-1 px-1 bg-green-2 active:bg-mask"
            click={() => { if (close) { close(); } }}
          >
            <Close></Close>
          </Button>
        </div>
        <div className="bg-white">{children}</div>
      </div>
    </div> : null}
  </>);
};

export default Modal;
