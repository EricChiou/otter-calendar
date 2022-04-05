import { renderToStaticMarkup } from 'react-dom/server';

import MessageComponent from './Message';

export enum MessageType {
  Info = 'info',
  Error = 'error',
}

export default class Message {
  public static add(message: string, type?: MessageType) {
    const id = `message-${new Date().getTime()}`;
    const jsxElement = <MessageComponent message={message} type={type}></MessageComponent>;
    const eleMarkUp = renderToStaticMarkup(jsxElement);
    const element = document.createElement('div');
    element.id = id;
    element.innerHTML = eleMarkUp;
    document.body.appendChild(element);
    setTimeout(() => { element.getElementsByTagName('div')[0].style.top = '5vh'; }, 0);

    setTimeout(() => {
      const ele = document.getElementById(id);
      if (ele) { document.body.removeChild(ele); }
    }, 3300);
  }
}