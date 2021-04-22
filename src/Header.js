import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import './Header.css';

function Header() {
  const [user] = useAuthState(auth);
  return (
    <div className='header'>
      <div className='header__left'>
        <Avatar className='header__avatar' src={user?.photoURL} />
        <h3>{user?.displayName}</h3>
      </div>
      <div className='header__center'>
        <div className='header__center__link__container'>
          <Link className='header__center__link' to='/'>
            Home
          </Link>
        </div>
        <div className='header__center__link__container'>
          <Link className='header__center__link' to='/movies/top-movies'>
            Movies
          </Link>
        </div>
        <div className='header__center__link__container'>
          <Link className='header__center__link' to={`/user/${user.uid}`}>
            My Profile
          </Link>
        </div>
      </div>
      <div className='header__right'>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    </div>
  );
}

export default Header;
