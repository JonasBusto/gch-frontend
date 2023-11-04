import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "./styles/app.css";

const App = () => {
  const value = {
    appendTo: "self",
    cssTransition: false,
    hideOverlayOnScroll: true,
    inputStyle: "filled",
    nullSortOrder: 1,
    ripple: false,
    zIndex: {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
      toast: 1200, // toast
    },
    autoZIndex: true,
  };
  return (
    <BrowserRouter>
      <PrimeReactProvider value={value}>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Main />
          <Footer />
        </div>
      </PrimeReactProvider>
    </BrowserRouter>
  );
};

export default App;
