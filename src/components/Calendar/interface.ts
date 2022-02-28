export interface Event {
  id: number | string;
  name: string;
  startTime: number;
  endTime: number;
  remark?: string;
}
