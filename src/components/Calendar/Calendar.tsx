import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Calendar as BigCalendar,
  Views,
  dayjsLocalizer,
} from 'react-big-calendar';
import withDragAndDrop, {
  EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';

import { EditModal } from 'components/EventBox/EditModal';
import { useDashboardContext } from 'context/DashboardContext';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.css';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const localizer = dayjsLocalizer(dayjs);

export const Calendar = () => {
  const { events, handleEventEditing } = useDashboardContext();

  const [selectedEvent, setSelectedEvent] = useState<IEvent>();

  const handleDragAndDropEdit = (data: EventInteractionArgs<object>) => {
    const { event, ...rest } = data;

    handleEventEditing({
      ...rest,
      id: (event as IEvent).id,
      title: (event as IEvent).title,
      end: new Date(rest.end),
      start: new Date(rest.start),
    });
  };

  return (
    <div className="calendar-wrapper">
      {selectedEvent && (
        <EditModal
          event={selectedEvent}
          isCreation={!selectedEvent.id}
          isOpen={!!selectedEvent}
          onRequestClose={() => setSelectedEvent(undefined)}
        />
      )}

      <DragAndDropCalendar
        resizable
        selectable
        defaultDate={new Date(2024, 3, 12)}
        defaultView={Views.DAY}
        events={events}
        localizer={localizer}
        onEventDrop={handleDragAndDropEdit}
        onEventResize={handleDragAndDropEdit}
        onSelectEvent={event => {
          if (event) setSelectedEvent(event as IEvent);
        }}
        onSelectSlot={data => {
          if (data.action === 'select') {
            setSelectedEvent({
              title: '',
              desc: '',
              start: new Date(data.start),
              end: new Date(data.end),
            });
          }
        }}
      />
    </div>
  );
};
