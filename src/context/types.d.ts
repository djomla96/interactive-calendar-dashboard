interface IEvent {
  id?: string;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  desc?: string;
}

interface IDashboardContext {
  events: IEvent[];
  setEvents: (events: IEvent[]) => void;
  handleEventEditing: (event: IEvent) => void;
  handleEventDeleting: (eventId: string) => void;
  handleEventCreating: (event: IEvent) => void;
}
