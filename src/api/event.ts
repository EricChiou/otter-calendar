import { APIResponse } from './interface/common';
import { Event } from '@/types/event';

import request from './base';

const date = new Date();
date.setMinutes(0);
date.setSeconds(0);
date.setMilliseconds(0);

export default class EventAPI {
  private static readonly PRE_URL = '/event';

  public static GetEventList(): Promise<Event[]> {
    return new Promise((resolve, reject) => {
      request.get<APIResponse<Event[]>>(this.PRE_URL)
        .then((response) => { if (response.data.result) { resolve(response.data.result); } })
        .catch(() => { reject(); });
    });
  }

  public static GetEventByID(eventID: number): Promise<Event> {
    return new Promise((resolve, reject) => {
      request.get<APIResponse<Event>>(`/event/${eventID}`)
        .then((response) => { if (response.data.result) { resolve(response.data.result); } })
        .catch(() => { reject(); });
    });
  }

  public static AddEvent(event: Event): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      request.post<APIResponse>(`${this.PRE_URL}/add`, event)
        .then((response) => { resolve(response.data); })
        .catch(() => { reject(); });
    });
  }

  public static UpdateEvent(event: Event): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      request.put<APIResponse>(this.PRE_URL, event)
        .then((response) => { resolve(response.data); })
        .catch(() => { reject(); });
    });
  }

  public static DeleteEvent(eventID: number): Promise<APIResponse> {
    return new Promise((resolve, reject) => {
      request.delete<APIResponse>(`/event/${eventID}`)
        .then((response) => { resolve(response.data); })
        .catch(() => { reject(); });
    });
  }
}