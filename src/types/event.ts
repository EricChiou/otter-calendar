export enum EventType {
  single = 'single',
  repeat = 'repeat',
}

export enum EventRepeatUnit {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

export interface BaseEvent {
  id: number;
  name: string;
  type: EventType;
  startTime: number;
  remark?: string;
}

export interface SingleEvent extends BaseEvent {
  type: EventType.single;
}

export interface RepeatEvent extends BaseEvent {
  type: EventType.repeat;
  repeatUnit: EventRepeatUnit;
  repeatInterval: number;
  repeatTime: number;
  lastTime: number | null;
}

export type Event = SingleEvent | RepeatEvent;
