import "./App.css";
import Header from "./Header";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "./Sidebar";
import Movies from "./Movies";
import { auth } from "./firebase";
import Login from "./Login";
import LoadingContainer from "./LoadingContainer";
function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingContainer />;
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
