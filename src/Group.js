import AddIcon from '@material-ui/icons/Add';
import MovieCreationRoundedIcon from '@material-ui/icons/MovieCreationRounded';
import React from 'react';
import { Link } from 'react-router-dom';
import './Group.css';

function Group(props) {
  return props.isGroup ? (
    <div className='group'>
      <Link className='group__link' to={`/group/${props.group.id}`}>
        <MovieCreationRoundedIcon className='group__icon' />
        <p>{props.group.name}</p>
      </Link>
    </div>
  ) : (
    <div className='group'>
      <Link className='group__link' to='/add-group'>
        <AddIcon className='group__icon' />
        <h2 className='add-group__text'>Start New Group</h2>
      </Link>
    </div>
  );
}

export default Group;
