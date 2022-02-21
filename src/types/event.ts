export enum EventType {
  single = 'single',
  repeat = 'repeat',
}

export interface Event {
  id: number;
  name: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
}
