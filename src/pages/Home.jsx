import React from 'react';
import cardsHome from '../helpers/cardHome';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div>
      <div className='row m-0'>
        {cardsHome.map((c) => (
          <div
            key={c.id}
            className='col-12 col-md-6 col-lg-4 d-flex flex-column card-home'
          >
            <div className='d-flex flex-column'>
              <div className='d-flex container-img-card-home'>
                <div
                  style={{
                    backgroundImage: 'url(' + c.imagen_seccion + ')',
                  }}
                >
                  <div></div>
                </div>
              </div>
              <div className='h-100 d-flex flex-column justify-content-between'>
                <div>
                  <div className='p-title'>
                    <p>{c.titulo_seccion}</p>
                  </div>
                  <div className='contain-p-card-home'>
                    <p>{c.desc_seccion}</p>
                  </div>
                </div>
                <div className='btn-card-home'>
                  <Link to={'/' + c.url}>Ingresar</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
