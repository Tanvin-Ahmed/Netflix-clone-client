import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen/HomeScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import { auth } from './components/SignInScreen/LoginManager';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
      } else {
        dispatch(logout());
      }
    })
    return unsubscribe;
  }, [dispatch])
  return (
    <div className="app">
      <Router>
        {
          !user ? (<Login />) : 
          (<Switch>
            <Route exact path='/'>
              <HomeScreen />
            </Route>
            <Route path='/profile'>
              <ProfileScreen />
            </Route>
          </Switch>)
        }
      </Router>
    </div>
  );
}

export default App;
