import { BrowserRouter } from 'react-router-dom';

import { DashboardContextProvider } from './context/DashboardContext';

import { Routes } from 'routes/Routes';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DashboardContextProvider>
          <Routes />
        </DashboardContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
