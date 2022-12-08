import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import PublicRoute from "./components/publicRoute/PublicRoute";
import { useCheckAuth } from "./hooks/useCheckAuth";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  //page reload diley localstorage a token asey kina sheita check and redux store update again
  const authCheck = useCheckAuth();
  console.log("auth checking", authCheck);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <PrivateRoute>
                <Conversation />
              </PrivateRoute>
            }
          />
          <Route
            path="/inbox/:id"
            element={
              <PrivateRoute>
                <Inbox />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
