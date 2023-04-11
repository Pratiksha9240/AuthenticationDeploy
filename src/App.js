import { Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import MyNavbar from "./Layout/MyNavbar";
import { useContext, useEffect } from "react";
import AuthContext from "./store/auth-context";
import DashBoard from "./components/Home";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  // console.log("Authctx",authCtx.expiresIn);

  useEffect(() => {
    if (!authCtx.token) {
      return;
    }
    setTimeout(() => {
      authCtx.logout();
      console.log("User logged out", authCtx.expiresIn * 1000);
    }, authCtx.expiresIn * 1000);
  }, [authCtx]);

  return (
    <div>
      <MyNavbar />
      <Route path="/"></Route>
      {!isLoggedIn && (
        <>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </>
      )}

      {isLoggedIn && (
        <Route path="/profile">
          <Profile />
        </Route>
      )}
      {isLoggedIn && (
        <Route path="/Dashboard">
          <DashBoard />
        </Route>
      )}
    </div>
  );
}

export default App;
