import { APIResponse, APIResponseStatus } from './interface/common';
import { EventType, EventRepeatUnit, Event, RepeatEvent } from '@/types/event';

import request from './base';

const date = new Date();
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);
const mockData: Event[] = [
  {
    id: 0,
    name: '測試事件',
    type: EventType.single,
    startTime: date.getTime(),
    remark: '這是備註。這是備註。這是備註。這是備註。這是備註。',
  },
  {
    id: 1,
    name: '測試事件2',
    type: EventType.repeat,
    repeatUnit: EventRepeatUnit.day,
    repeatInterval: 2,
    repeatTime: 5,
    startTime: date.getTime() - 86400000,
    lastTime: null,
    remark: '這是備註。這是備註。這是備註。這是備註。這是備註。',
  },
];

export default class EventAPI {
  public static GetEventList(eventType?: EventType): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => { resolve(mockData); }, 100);
      // request.get<Event[]>('/event/list', { params: { eventType } })
      //   .then((response) => { resolve(response.data); })
      //   .catch(() => { reject(); });
    });
  }

  public static UpdateEventLastTime(eventID: number): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
        (mockData[1] as RepeatEvent).lastTime = new Date().getTime();
        resolve({ status: APIResponseStatus.success });
      }, 100);
      // request.put<APIResponse>(`/event/${eventID}`)
      //   .then((response) => { resolve(response.data); })
      //   .catch(() => { reject(); });
    });
  }

  public static GetEventByID(eventID: number): Promise<Event> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => { resolve(mockData[1]); }, 100);
      // request.get<Event>(`/event/${eventID}`)
      //   .then((response) => { resolve(response.data); })
      //   .catch(() => { reject(); });
    });
  }
}