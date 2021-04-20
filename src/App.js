import { useCallback, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import { auth } from './firebase';
import Header from './Header';
import LoadingContainer from './LoadingContainer';
import Login from './Login';
import Movies from './Movies';
import { fetchGroupsByUserId } from './requests';
import Sidebar from './Sidebar';

function App() {
  const [user, loading] = useAuthState(auth);
  const [groups, setGroups] = useState([]);

  const memoizedCallback = useCallback(() => {
    fetchGroupsByUserId(user.uid)
      .then((res) => setGroups(res))
      .catch((err) => console.log(err.message));
  }, [user]);

  if (loading) {
    return <LoadingContainer loading={loading} />;
  }

  return user != null ? (
    <div className='app'>
      <Header />
      <div className='app__body'>
        <Sidebar groups={groups} fetchGroups={memoizedCallback} />
        <Movies fetchGroups={memoizedCallback} />
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default App;
