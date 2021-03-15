import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import { auth } from "./firebase";
import Header from "./Header";
import LoadingContainer from "./LoadingContainer";
import Login from "./Login";
import Movies from "./Movies";
import Sidebar from "./Sidebar";
function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingContainer loading={loading} />;
  }

  return user != null ? (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
        <Movies />
      </div>
    </div>
  ) : (
    <Login />
  );
}

export default App;
