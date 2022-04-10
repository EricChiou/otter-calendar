import { FunctionComponent, useEffect, useState } from 'react';

import { EventType, RepeatEvent } from '@/types/event';

import { formatDate } from '@/utils/dateFormat';
import Button from '@/components/Button';
import EventAPI from '@/api/event';
import EditEvent from '@/components/EditEvent';
import DeleteEvent from '@/components/DeleteEvent';
import { getEventNextTime } from '@/utils/event';

const EventRecords: FunctionComponent = () => {
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [eventList, setEventList] = useState<RepeatEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<RepeatEvent | null>(null);

  useEffect(() => { getEventList(); }, []);

  function getEventList() {
    EventAPI.GetEventList()
      .then((r) => {
        const eventList = r.filter((event) => event.type === EventType.repeat) as RepeatEvent[];
        setEventList(eventList);
      });
  }

  function updateEventLastTime(event: RepeatEvent) {
    const nextTime = getEventNextTime(event);
    const newEvent: RepeatEvent = { ...event };
    newEvent.lastTime = nextTime < new Date().getTime() ? new Date().getTime() : nextTime;
    EventAPI.UpdateEvent(newEvent).then(() => {
      EventAPI.GetEventByID(event.id).then((newEvent) => {
        eventList[eventList.findIndex((e) => e.id === newEvent.id)] = newEvent as RepeatEvent;
        setEventList([...eventList]);
      });
    });
  }

  function updateEvent(newEvent: RepeatEvent) {
    EventAPI.UpdateEvent(newEvent).then(() => {
      getEventList();
    });
  }

  function deleteEvent(e: RepeatEvent) {
    EventAPI.DeleteEvent(e.id).then(() => {
      getEventList();
    });
  }

  function renderNextTime(event: RepeatEvent): JSX.Element {
    if (event.type !== EventType.repeat) { return <></>; }
    const nextTime = getEventNextTime(event);
    return (
      <span className={`${nextTime < new Date().getTime() ? 'text-red' : ''}`}>
        {formatDate(new Date(nextTime), 'yyyy-MM-dd hh:mm')}
      </span>
    );
  }

  function renderEventRecords(event: RepeatEvent): JSX.Element {
    if (event.type !== EventType.repeat) { return <></>; }
    return (
      <div key={event.id}>
        <div className="py-1">
          <div className="text-xl">{event.name}</div>
          <div className="my-0.5">
            最後執行: {event.lastTime ? formatDate(new Date(event.lastTime), 'yyyy-MM-dd hh:mm') : ''}
          </div>
          <div className="my-0.5">
            下次執行: {renderNextTime(event)}
            &nbsp;<Button text={'已執行'} click={() => { updateEventLastTime(event); }}></Button>
          </div>
          <div className="my-0.5">
            備註： {event.remark}
          </div>
          <div className="my-0.5">
            <Button text={'修改'} click={() => { setEditModal(true); setSelectedEvent(event); }}></Button>
            &nbsp;
            <Button
              className="bg-red active:bg-red-2"
              text={'刪除'}
              click={() => { setDeleteModal(true); setSelectedEvent(event); }}
            ></Button>
          </div>
        </div>
        <hr></hr>
      </div>
    );
  }

  return (<>
    <div className="m-2 sm:m-4">
      <div className="text-2xl font-bold">事件執行紀錄</div>
      <div className="my-2">
        <hr></hr>
        {eventList.map((event) => renderEventRecords(event))}
      </div>
    </div>
    {addModal ? <EditEvent show={addModal} close={() => { setAddModal(false); }}></EditEvent> : null}
    {editModal && selectedEvent ?
      <EditEvent
        show={editModal}
        event={selectedEvent}
        update={updateEvent}
        close={() => { setEditModal(false); }}
      ></EditEvent> : null}
    {deleteModal && selectedEvent ?
      <DeleteEvent
        show={deleteModal}
        event={selectedEvent}
        del={deleteEvent}
        close={() => { setDeleteModal(false); }}
      ></DeleteEvent> : null}
  </>);
};

export default EventRecords;
