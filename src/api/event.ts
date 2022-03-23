import { EventType, EventRepeatUnit, Event } from '@/types/event';

import request from './base';
import API from '@/constants/api';

export default class EventAPI {
  public static GET_EVENT_LIST(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
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
          },
          {
            id: 1,
            name: '測試事件2',
            type: EventType.repeat,
            repeatUnit: EventRepeatUnit.day,
            repeatInterval: 2,
            repeatTime: 5,
            startTime: date.getTime() + 86400000,
            lastTime: null,
          },
        ];
        resolve(mockData);
      }, 500);
    });
    // request.get<EventResp[]>(API.GET_EVENT_LIST)
    //   .then((response) => {
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     reject(error);
    //   });
  }
}