import { EventType } from '@/types/event';

export interface EventResp {
  id: number;
  name: string;
  type: EventType;
  startDate: number;
  endDate: number;
}
