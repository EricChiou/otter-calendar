import { ChangeEvent, FunctionComponent, useState } from 'react';

import { Event, EventType, eventTypes, EventRepeatUnit, eventRepeatUnits } from '@/types/event';

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
          repeatInterval: 1,
          repeatUnit: EventRepeatUnit.day,
          repeatTime: 1,
          lastTime: null,
        });
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
    <Modal show={show} title={`${event ? '??????' : '??????'}??????`} close={() => { close(); }}>
      <div className="py-2 px-1.5">
        <div className="text-left">
          <div className="mb-3">
            <input
              className="px-1 w-full border border-mask-4 outline-none"
              placeholder="????????????"
              value={_event.name}
              onChange={(e) => { setEvent({ ..._event, name: e.target.value }); }}
            ></input>
          </div>
          <div className="mb-3">
            ???????????????
            <select className="border border-mask-4 outline-none" value={_event.type} onChange={eventTypeOnChange}>
              {eventTypes.map((eventType) => (
                <option key={eventType.value} value={eventType.value}>{eventType.label}</option>
              ))}
            </select>
          </div>
          {_event.type === EventType.repeat ? <>
            <div className="mb-3">
              ???????????????
              <input
                className="pl-1 mr-1 w-14 border border-mask-4 outline-none"
                type="number" step="1" min="1" max="999"
                value={_event.repeatInterval}
                onChange={repeatIntervalOnChange}
              ></input>
              <select
                className="border border-mask-4 outline-none"
                value={_event.repeatUnit}
                onChange={repeatUnitOnChange}
              >
                {eventRepeatUnits.map((eventRepeatUnit) => (
                  <option key={eventRepeatUnit.value} value={eventRepeatUnit.value}>{eventRepeatUnit.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              ???????????????
              <input
                className="pl-1 mr-1 w-14 border border-mask-4 outline-none"
                type="number" step="1" min="0" max="999"
                value={_event.repeatTime}
                onChange={repeatTimeOnChange}
              ></input>???
            </div>
            {_event.lastTime ?
              <div className="mb-3">
                ???????????????
                <br></br>
                <EditTime
                  time={_event.lastTime}
                  onChange={(time) => { setEvent({ ..._event, lastTime: time }); }}
                ></EditTime>
              </div> : null}
          </> : null}
          <div className="mb-3">
            ???????????????
            <br></br>
            <EditTime
              time={_event.startTime}
              onChange={(time) => { setEvent({ ..._event, startTime: time }); }}
            ></EditTime>
          </div>
          <div className="mb-3">
            <input
              className="px-1 w-full border border-mask-4 outline-none"
              placeholder="??????"
              value={_event.remark}
              onChange={(e) => { setEvent({ ..._event, remark: e.target.value }); }}
            ></input>
          </div>
          <div className="text-center">
            <Button click={event ? updateEvent : addEvent}>{event ? '??????' : '??????'}</Button>
            &nbsp;
            <Button click={() => { close(); }}>??????</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditEvent;
