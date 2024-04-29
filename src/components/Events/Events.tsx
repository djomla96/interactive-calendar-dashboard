import { useState } from 'react';

import { EditModal } from 'components/EventBox/EditModal';
import { EventBox } from 'components/EventBox/EventBox';
import { useDashboardContext } from 'context/DashboardContext';

import './Events.css';

export const Events = () => {
  const { events } = useDashboardContext();

  const [isOpen, setOpen] = useState(false);

  return (
    <div className="events-container">
      <button className="add-new-event" onClick={() => setOpen(true)}>
        Add new event
      </button>
      {events.map(event => (
        <EventBox key={event.id} {...event} />
      ))}

      <EditModal
        isCreation
        event={{
          title: '',
          desc: '',
          start: new Date(),
          end: new Date(),
        }}
        isOpen={isOpen}
        onRequestClose={() => setOpen(false)}
      />
    </div>
  );
};
