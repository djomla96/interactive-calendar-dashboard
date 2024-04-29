import { FaCalendar, FaTasks } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useDashboardContext } from 'context/DashboardContext';
import { initialEvents } from 'context/initialEvents';
import { ROUTES } from 'routes/routes';

import './Sidebar.css';

export const Sidebar = () => {
  const { setEvents } = useDashboardContext();

  return (
    <div className="sidebar-container">
      <h2>Interactive dashboard</h2>

      <div className="sidebar-links">
        <Link to={ROUTES.calendar}>
          <FaCalendar size={24} /> Calendar
        </Link>
        <Link to={ROUTES.events}>
          <FaTasks size={24} /> Events
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem('events');
            setEvents(initialEvents);
          }}>
          Reset cache
        </button>
      </div>
    </div>
  );
};
