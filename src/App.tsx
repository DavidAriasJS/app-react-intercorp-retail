import { Navigate, Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { AppProvider } from './contexts';
import { HomePage, ClientsPage, AnalysisPage } from './pages';
import { Header } from './components';

import './App.css';

const App = () => {
 
  return (
    <AppProvider>
      <div className="w-100">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="clients" element={ <ClientsPage /> } />
            <Route path="analysis" element={ <AnalysisPage /> } />
            
            <Route path="/*" element={ <Navigate to="/" /> } />
          </Routes>
        </Container>
      </div>
    </AppProvider>
  )
};

export default App;
