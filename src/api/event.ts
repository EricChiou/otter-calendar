import request from './base';

import { EventType } from '@/types/event';
import API from '@/constants/api';

export default class EventAPI {
  public static GET_EVENT_LIST(): Promise<{ id: number }[]> {
    return new Promise((resolve, reject) => {
      // mock data
      setTimeout(() => {
        const mockData = [
          {
            id: 0,
            type: EventType.single,
          },
          {
            id: 1,
            type: EventType.single,
          },
          {
            id: 2,
            type: EventType.repeat,
          },
          {
            id: 3,
            type: EventType.single,
          },
          {
            id: 4,
            type: EventType.repeat,
          },
        ];
        resolve(mockData);
      }, 500);

      // request.get<{ id: number }[]>(API.GET_EVENT_LIST)
      //   .then((response) => {
      //     resolve(response.data);
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   });
    });
  }
}