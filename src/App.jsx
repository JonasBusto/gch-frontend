import { Header } from './components/structure/Header';
import { Main } from './components/structure/Main';
import { Footer } from './components/structure/Footer';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { GchProvider } from './context/GchContext';
import './styles/app.css';

export function App() {
  return (
    <BrowserRouter>
      <GchProvider>
        <PrimeReactProvider>
          <div className='d-flex flex-column min-vh-100'>
            <Header />
            <Main />
            <Footer />
          </div>
        </PrimeReactProvider>
      </GchProvider>
    </BrowserRouter>
  );
}
