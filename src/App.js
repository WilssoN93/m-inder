import { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route } from 'react-router';
import AddGroup from './AddGroup';
import './App.css';
import { auth } from './firebase';
import GroupPage from './GroupPage';
import Header from './Header';
import Home from './Home';
import Invite from './Invite';
import Join from './Join';
import LoadingContainer from './LoadingContainer';
import Login from './Login';
import Movies from './Movies';
import { fetchGroupsByUserId } from './requests';
import Sidebar from './Sidebar';

function App() {
  const [user, loading] = useAuthState(auth);
  const [groups, setGroups] = useState([]);

  const fetchGroups = useCallback(() => {
    fetchGroupsByUserId(user.uid)
      .then((res) => setGroups(res))
      .catch((err) => console.log(err.message));
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchGroups();
    }
  }, [user, fetchGroups]);

  if (loading) {
    return <LoadingContainer loading={loading} />;
  }

  return user != null ? (
    <div className='app'>
      <Header />
      <div className='app__body'>
        <Sidebar groups={groups} />
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/group/:groupId'>
          <GroupPage />
        </Route>
        <Route path='/add-group'>
          <AddGroup fetchGroups={fetchGroups} />
        </Route>
        <Route path='/group/:groupId/join'>
          <Join />
        </Route>
        <Route path='/group/:groupId/invite'>
          <Invite />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default App;
