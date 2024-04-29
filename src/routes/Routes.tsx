import { Route, Routes as ReactRoutes } from 'react-router-dom';

import { ROUTES } from './routes';
import { WithSidebar } from './WithSidebar/WithSidebar';

import { Calendar } from 'components/Calendar/Calendar';
import { Events } from 'components/Events/Events';

export const Routes = () => (
  <ReactRoutes>
    <Route
      element={
        <WithSidebar>
          <Calendar />
        </WithSidebar>
      }
      path={ROUTES.calendar}
    />
    <Route
      element={
        <WithSidebar>
          <Events />
        </WithSidebar>
      }
      path={ROUTES.events}
    />
  </ReactRoutes>
);
