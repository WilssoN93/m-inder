import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import './Profile.css';

function Profile() {
  const [user] = useAuthState(auth);
  return (
    <div className='profile'>
      <div className='profile__user'>
        <Avatar className="profile__user__" src={user?.photoURL} />
        <h1>{user.displayName}</h1>
      </div>
    </div>
  );
}

export default Profile;
