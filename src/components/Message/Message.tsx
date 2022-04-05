import { FunctionComponent } from 'react';

import { MessageType } from './index';

import Error from './Error';
import Info from './Info';

interface Props {
  message: string;
  type?: MessageType;
}

const Message: FunctionComponent<Props> = ({ message, type = MessageType.Info }) => {
  function getBackgroundColor(): string {
    switch (type) {
      case MessageType.Info:
        return 'bg-green-2';
      case MessageType.Error:
        return 'bg-red';
    }
  }

  function renderIcon(): JSX.Element {
    switch (type) {
      case MessageType.Info:
        return <Info width="1.25rem" height="1.25rem"></Info>;
      case MessageType.Error:
        return <Error width="1.25rem" height="1.25rem"></Error>;
    }
  }

  const className = 'fixed top-[-100%] left-1/2 py-1 px-2 text-white translate-x-[-50%] transition-all duration-300';
  return (
    <div className={`${className} ${getBackgroundColor()}`}>
      <span className="inline-block mr-0.5 align-middle">{renderIcon()}</span>
      <span className="inline-block align-middle">{message}</span>
    </div>
  );
};

export default Message;
