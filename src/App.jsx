import React from 'react';
import Header from './components/structure/Header';
import Main from './components/structure/Main';
import Footer from './components/structure/Footer';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { GchProvider } from './context/GchContext';
import './styles/app.css';

const App = () => {
  const value = {
    appendTo: 'self',
    cssTransition: false,
    hideOverlayOnScroll: true,
    inputStyle: 'filled',
    nullSortOrder: 1,
    ripple: false,
    zIndex: {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
      toast: 1200,
    },
    autoZIndex: true,
  };
  return (
    <BrowserRouter>
      <GchProvider>
        <PrimeReactProvider value={value}>
          <div className='d-flex flex-column min-vh-100'>
            <Header />
            <Main />
            <Footer />
          </div>
        </PrimeReactProvider>
      </GchProvider>
    </BrowserRouter>
  );
};

export default App;
