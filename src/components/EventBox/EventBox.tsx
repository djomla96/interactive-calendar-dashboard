import dayjs from 'dayjs';
import { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';
import ReactModal from 'react-modal';

import { MONTHS } from './constants';
import { EditModal } from './EditModal';

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

import './EventBox.css';

const getMonth = (date: Date) => MONTHS[dayjs(date).month()];

export const EventBox = (event: IEvent) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { handleEventDeleting } = useDashboardContext();

  const deleteEvent = () => {
    handleEventDeleting(event.id || '');
    setDeleteModalOpen(false);
  };

  return (
    <div className="event-box">
      <div className="left-wrapper">
        <div className="event-date">
          <div className="event-day">{dayjs(event.start).date()}</div>
          <div className="event-month">
            {getMonth(event.start).substring(0, 3)}
          </div>
        </div>

        <div className="event-content">
          <div className="top-box">
            <h3>{event.title}</h3>
            <p>{event.desc}</p>
          </div>

          <div className="time">
            <FaClock />
            <div>
              {`${dayjs(event.start).format('MMMM D, YYYY')} - ${dayjs(event.end).format('MMMM D, YYYY')}`}
            </div>
          </div>
        </div>
      </div>

      <div className="action-container">
        <button onClick={() => setDeleteModalOpen(true)}>
          <MdDelete fill="#cc0000" size={24} />
        </button>

        <button>
          <MdEdit size={24} onClick={() => setEditModalOpen(true)} />
        </button>
      </div>

      <ReactModal
        isOpen={isDeleteModalOpen}
        style={customStyles}
        onRequestClose={() => setDeleteModalOpen(false)}>
        <h2>Delete event</h2>
        <p>{`Are you sure you want to delete event ${event.id}`}</p>

        <button onClick={() => setDeleteModalOpen(false)}>Cancel</button>
        <button onClick={deleteEvent}>Yes, delete</button>
      </ReactModal>

      <EditModal
        event={event}
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
      />
    </div>
  );
};
