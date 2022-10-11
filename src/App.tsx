import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts';

import './App.css';

import { HomePage, ClientsPage } from './pages';
import { Header } from './components';
import Container from 'react-bootstrap/Container';

const App = () => {

  return (
    <AppProvider>
      <div className="w-100">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="clients" element={ <ClientsPage /> } />
            
            <Route path="/*" element={ <Navigate to="/" /> } />
          </Routes>
        </Container>
      </div>
    </AppProvider>
  )
};

export default App;
