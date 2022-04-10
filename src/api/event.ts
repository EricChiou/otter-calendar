import { APIResponse, APIResponseStatus } from './interface/common';
import { EventType, EventRepeatUnit, Event } from '@/types/event';

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
  public static GetEventList(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      request.get<APIResponse<Event[]>>('/event')
        .then((response) => { if (response.data.result) { resolve(response.data.result); } })
        .catch(() => { reject(); });
    });
  }

  public static AddEvent(event: Event): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      request.post<APIResponse>('/event/add', event)
        .then((response) => { resolve(response.data); })
        .catch(() => { reject(); });
    });
  }

  public static UpdateEvent(event: Event): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
        const targetEvent = mockData.find((d) => d.id === event.id);
        if (!targetEvent) { return; }
        targetEvent.name = event.name;
        targetEvent.startTime = event.startTime;
        targetEvent.type = event.type;
        targetEvent.remark = event.remark;
        if (targetEvent.type === EventType.repeat && event.type === EventType.repeat) {
          targetEvent.repeatUnit = event.repeatUnit;
          targetEvent.repeatInterval = event.repeatInterval;
          targetEvent.repeatTime = event.repeatTime;
          targetEvent.lastTime = event.lastTime;
        }
        resolve({ status: APIResponseStatus.Success });
      }, 100);
      // request.put<APIResponse>(`/event/${eventID}`)
      //   .then((response) => { resolve(response.data); })
      //   .catch(() => { reject(); });
    });
  }

  public static DeleteEvent(eventID: number): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
        mockData.splice(mockData.findIndex((e) => e.id === eventID), 1);
        resolve({ status: APIResponseStatus.Success });
      }, 100);
      // request.put<APIResponse>(`/event/${eventID}`)
      //   .then((response) => { resolve(response.data); })
      //   .catch(() => { reject(); });
    });
  }

  public static GetEventByID(eventID: number): Promise<Event> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
        const event = mockData.find((d) => d.id === eventID);
        if (event) { resolve(event); }
      }, 100);
      // request.get<Event>(`/event/${eventID}`)
      //   .then((response) => { resolve(response.data); })
      //   .catch(() => { reject(); });
    });
  }
}