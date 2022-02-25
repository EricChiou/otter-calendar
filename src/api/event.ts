import { EventType, EventRepeatUnit, Event } from '@/types/event';

import request from './base';
import API from '@/constants/api';

export default class EventAPI {
  public static GET_EVENT_LIST(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
        const mockData: Event[] = [
          {
            id: 0,
            name: '測試事件',
            type: EventType.single,
            startTime: new Date().getTime(),
            endTime: new Date().getTime() + 60 * 60 * 1000,
          },
          {
            id: 1,
            name: '測試事件2',
            type: EventType.repeat,
            repeatUnit: EventRepeatUnit.day,
            repeatInterval: 1,
            repeatTime: 0,
            startTime: new Date().getTime() + 24 * 60 * 60 * 1000,
            endTime: new Date().getTime() + 25 * 60 * 60 * 999,
            lastTime: null,
          },
        ];
        resolve(mockData);
      }, 500);

      // request.get<EventResp[]>(API.GET_EVENT_LIST)
      //   .then((response) => {
      //     resolve(response.data);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  }
}