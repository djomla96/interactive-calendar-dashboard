import { createContext, useCallback, useContext, useState } from 'react';

import { initialEvents } from './initialEvents';

const DashboardContext = createContext<IDashboardContext>({
  events: initialEvents,
  setEvents: () => null,
  handleEventEditing: () => null,
  handleEventDeleting: () => null,
  handleEventCreating: () => null,
});

const generateId = () => (Math.random() + 1).toString(36).substring(7);

export const DashboardContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [events, setEvents] = useState(initialEvents);

  const handleEventEditing = useCallback((event: IEvent) => {
    setEvents(prev =>
      prev.map(item => {
        if (item.id === event.id) {
          return event;
        }

        return item;
      }),
    );
  }, []);

  const handleEventDeleting = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(item => item.id !== eventId));
  }, []);

  const handleEventCreating = useCallback((event: IEvent) => {
    setEvents(prev => [{ ...event, id: generateId() }, ...prev]);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        events,
        setEvents,
        handleEventEditing,
        handleEventDeleting,
        handleEventCreating,
      }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
