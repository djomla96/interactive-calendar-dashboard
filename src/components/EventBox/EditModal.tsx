import dayjs from 'dayjs';
import { useState } from 'react';
import ReactModal from 'react-modal';

import { useDashboardContext } from 'context/DashboardContext';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface EditModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  event: IEvent;
  isCreation?: boolean;
}

export const EditModal = ({
  isOpen,
  onRequestClose,
  event,
  isCreation,
}: EditModalProps) => {
  const { handleEventEditing, handleEventCreating } = useDashboardContext();

  const [title, setTitle] = useState(event.title);
  const [desc, setDesc] = useState(event.desc);
  const [start, setStart] = useState(
    dayjs(event.start).format('YYYY-MM-DDThh:mm'),
  );
  const [end, setEnd] = useState(dayjs(event.end).format('YYYY-MM-DDThh:mm'));

  const [allDay, setAllDay] = useState(event.allDay);

  const editEvent = () => {
    handleEventEditing({
      ...event,
      title,
      desc,
      start: new Date(start),
      end: new Date(end),
      allDay,
    });

    onRequestClose();
  };

  const createEvent = () => {
    handleEventCreating({
      ...event,
      title,
      desc,
      start: new Date(start),
      end: new Date(end),
      allDay,
    });

    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      style={{ ...customStyles, overlay: { zIndex: 10 } }}
      onRequestClose={onRequestClose}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
        onSubmit={() => {
          if (isCreation) {
            createEvent();
          } else {
            editEvent();
          }
        }}>
        <label>Title</label>
        <input
          placeholder="Enter title ..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <label>Desc</label>
        <input
          placeholder="Enter desc ..."
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />

        <label>Start date</label>
        <input
          placeholder="Select start date"
          type="datetime-local"
          value={start}
          onChange={e => setStart(e.target.value)}
        />

        <label>End date</label>
        <input
          placeholder="Select end date"
          type="datetime-local"
          value={end}
          onChange={e => setEnd(e.target.value)}
        />

        <div>
          <label>allDay</label>
          <input
            checked={allDay}
            type="checkbox"
            onChange={e => setAllDay(e.target.checked)}
          />
        </div>

        <button onClick={onRequestClose}>Cancel</button>
        <button type="submit">Save event</button>
      </form>
    </ReactModal>
  );
};
