export enum EventType {
  single = 'single',
  repeat = 'repeat',
}

export enum EventCalType {
  byStart = 'by_start',
  byLast = 'by_last',
}

export enum EventRepeatUnit {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

export const eventTypes: { label: string, value: EventType }[] = [
  {
    label: '單次',
    value: EventType.single,
  },
  {
    label: '重複',
    value: EventType.repeat,
  },
];

export const eventCalTypes: { label: string, value: EventCalType }[] = [
  {
    label: '以事件開始時間計算',
    value: EventCalType.byStart,
  },
  {
    label: '以最後執行時間計算',
    value: EventCalType.byLast,
  },
];

export const eventRepeatUnits: { label: string, value: EventRepeatUnit }[] = [
  {
    label: '天',
    value: EventRepeatUnit.day,
  },
  {
    label: '周',
    value: EventRepeatUnit.week,
  },
  {
    label: '月',
    value: EventRepeatUnit.month,
  },
  {
    label: '年',
    value: EventRepeatUnit.year,
  },
];

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
  calType: EventCalType;
  repeatUnit: EventRepeatUnit;
  repeatInterval: number;
  repeatTime: number;
  lastTime: number | null;
}

export type Event = SingleEvent | RepeatEvent;
