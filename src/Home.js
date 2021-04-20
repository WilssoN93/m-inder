import React from 'react';
import './Home.css';
import logo from './images/minder-logo.jpg';

function Home() {
  return (
    <div className='home'>
      <div className='home__image__container'>
        <img src={logo} alt='m-inder logo' />
      </div>
    </div>
  );
}

export default Home;
