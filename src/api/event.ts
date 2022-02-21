import { EventType, Event } from '@/types/event';
import { EventResp } from './interface/event';

import request from './base';
import API from '@/constants/api';

export default class EventAPI {
  public static GET_EVENT_LIST(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
        const mockData = [
          {
            id: 0,
            name: '測試事件',
            type: EventType.single,
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + 60 * 60 * 1000),
          },
          {
            id: 1,
            name: '測試事件2',
            type: EventType.single,
            startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            endDate: new Date(new Date().getTime() + 25 * 60 * 60 * 999),
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