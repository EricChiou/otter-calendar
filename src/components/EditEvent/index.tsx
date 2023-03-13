import { ChangeEvent, FunctionComponent, useState } from 'react';

import {
  Event,
  EventType,
  eventTypes,
  EventRepeatUnit,
  eventRepeatUnits,
  EventCalType,
  eventCalTypes,
} from '@/types/event';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import EditTime from './EditTime';

interface Props {
  show: boolean;
  event?: Event
  close(): void;
  update?(event: Event): void;
  add?(event: Event): void;
}

const EditEvent: FunctionComponent<Props> = ({ show, event, close, update, add }) => {
  const [_event, setEvent] = useState<Event>(event ?
    { ...event } :
    {
      id: 0,
      name: '',
      type: EventType.single,
      startTime: new Date().getTime(),
      remark: '',
    });

  function eventTypeOnChange(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case EventType.single:
        setEvent({
          id: _event.id,
          name: _event.name,
          type: EventType.single,
          startTime: _event.startTime,
          remark: _event.remark,
        });
        break;
      case EventType.repeat:
        setEvent({
          ..._event,
          type: EventType.repeat,
          calType: EventCalType.byStart,
          repeatInterval: 1,
          repeatUnit: EventRepeatUnit.day,
          repeatTime: 1,
          lastTime: null,
        });
        break;
    }
  }

  function eventCalTypeOnChange(e: ChangeEvent<HTMLSelectElement>) {
    switch (e.target.value) {
      case EventCalType.byStart:
        if (_event.type === EventType.repeat) {
          setEvent({
            ..._event,
            calType: EventCalType.byStart,
          });
        }
        break;
      case EventCalType.byLast:
        if (_event.type === EventType.repeat) {
          setEvent({
            ..._event,
            calType: EventCalType.byLast,
          });
        }
        break;
    }
  }

  function repeatIntervalOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (_event.type !== EventType.repeat) { return; }
    let interval = Math.floor(Number(e.target.value.split('.')[0]));
    interval = interval < 1 ? 1 : (interval > 999 ? 999 : interval);
    setEvent({ ..._event, repeatInterval: interval });
  }

  function repeatUnitOnChange(e: ChangeEvent<HTMLSelectElement>) {
    if (_event.type !== EventType.repeat) { return; }
    setEvent({ ..._event, repeatUnit: e.target.value as EventRepeatUnit });
  }

  function repeatTimeOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (_event.type !== EventType.repeat) { return; }
    let time = Math.floor(Number(e.target.value.split('.')[0]));
    time = time < 0 ? 0 : (time > 999 ? 999 : time);
    setEvent({ ..._event, repeatTime: time });
  }

  function updateEvent() {
    if (!update) { return; }
    update(_event);
    close();
  }

  function addEvent() {
    if (!add) { return; }
    add(_event);
    close();
  }

  return (
    <Modal show={show} title={`${event ? '修改' : '新增'}事件`} close={() => { close(); }}>
      <div className="py-2 px-1.5">
        <div className="text-left">
          <div className="mb-3">
            <input
              className="w-full input"
              placeholder="事件名稱"
              value={_event.name}
              onChange={(e) => { setEvent({ ..._event, name: e.target.value }); }}
            ></input>
          </div>
          <div className="mb-3">
            事件類型：
            <select className="input" value={_event.type} onChange={eventTypeOnChange}>
              {eventTypes.map((eventType) => (
                <option key={eventType.value} value={eventType.value}>{eventType.label}</option>
              ))}
            </select>
          </div>
          {_event.type === EventType.repeat ? <>
            <div className="mb-3">
              執行間隔：
              <input
                className="pl-1 mr-1 w-14 input"
                type="number" step="1" min="1" max="999"
                value={_event.repeatInterval}
                onChange={repeatIntervalOnChange}
              ></input>
              <select
                className="input"
                value={_event.repeatUnit}
                onChange={repeatUnitOnChange}
              >
                {eventRepeatUnits.map((eventRepeatUnit) => (
                  <option key={eventRepeatUnit.value} value={eventRepeatUnit.value}>{eventRepeatUnit.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              計算方式：
              <select
                className="input"
                value={_event.calType}
                onChange={eventCalTypeOnChange}
              >
                {eventCalTypes.map((eventCalType) => (
                  <option key={eventCalType.value} value={eventCalType.value}>{eventCalType.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              重複次數：
              <input
                className="pl-1 mr-1 w-14 input"
                type="number" step="1" min="0" max="999"
                value={_event.repeatTime}
                onChange={repeatTimeOnChange}
              ></input>次
            </div>
            {_event.lastTime ?
              <div className="mb-3">
                最後執行：
                <br></br>
                <EditTime
                  time={_event.lastTime}
                  onChange={(time) => { setEvent({ ..._event, lastTime: time }); }}
                ></EditTime>
              </div> : null}
          </> : null}
          <div className="mb-3">
            開始日期：
            <br></br>
            <EditTime
              time={_event.startTime}
              onChange={(time) => { setEvent({ ..._event, startTime: time }); }}
            ></EditTime>
          </div>
          <div className="mb-3">
            <input
              className="w-full input"
              placeholder="備註"
              value={_event.remark}
              onChange={(e) => { setEvent({ ..._event, remark: e.target.value }); }}
            ></input>
          </div>
          <div className="text-center">
            <Button click={event ? updateEvent : addEvent}>{event ? '修改' : '新增'}</Button>
            &nbsp;
            <Button click={() => { close(); }}>取消</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditEvent;
