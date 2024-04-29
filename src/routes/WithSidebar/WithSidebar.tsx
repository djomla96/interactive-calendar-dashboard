import { Sidebar } from 'components/Sidebar/Sidebar';
import { useEventsCaching } from 'hooks/useEventsCaching';
import './WithSidebar.css';

export const WithSidebar = ({ children }: React.PropsWithChildren<{}>) => {
  const { isCachingFinished } = useEventsCaching();

  return (
    <div className="page-container">
      <Sidebar />

      <div className="page-content">{isCachingFinished && children}</div>
    </div>
  );
};
