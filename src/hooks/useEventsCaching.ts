import { useEffect, useRef, useState } from 'react';

import { useDashboardContext } from 'context/DashboardContext';

export const useEventsCaching = () => {
  const [isCachingFinished, setCachingFinished] = useState(false);
  const { events, setEvents } = useDashboardContext();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      try {
        const cachedEvents = localStorage.getItem('events');

        if (cachedEvents) {
          setEvents(
            (JSON.parse(cachedEvents) as IEvent[]).map(item => ({
              ...item,
              end: new Date(item.end),
              start: new Date(item.start),
            })),
          );
        }
      } catch (err) {
        console.error(err);
      }

      setCachingFinished(true);
    } else {
      try {
        localStorage.setItem('events', JSON.stringify(events));
      } catch (err) {
        console.error(err);
      }
    }
  }, [setEvents, events]);

  return { isCachingFinished };
};
