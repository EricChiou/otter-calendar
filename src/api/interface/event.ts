import { EventRepeatUnit, EventType } from '@/types/event';

export interface Event {
  id: number;
  name: string;
  type: EventType;
  startTime: number;
  repeatUnit?: EventRepeatUnit;
  repeatInterval?: number;
  repeatTime?: number;
  lastTime?: number | null;
  remark?: string;
}