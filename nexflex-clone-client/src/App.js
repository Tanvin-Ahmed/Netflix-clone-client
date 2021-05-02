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
import Payment from './components/Payment/Payment';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      getUserInfo(userAuth.email);
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
      } else {
        dispatch(logout());
      }
    })
    return unsubscribe, getUserInfo;
  }, [dispatch]);


  const getUserInfo = async (email) => {
    await fetch(`https://boiling-bayou-07410.herokuapp.com/getCurrentUser/${email}`)
    .then(response => response.json())
      .then(data => {
        dispatch(login({
          ...user,
          plan: data.plan,
          payment: data.payment,
          id: data._id
        }));
      })
      .catch(err => console.log(err));
  }


  return (
    <div className="app">
      <Router>
        {
          !user ? (<Login />) :
            (<Switch>
              <Route exact path='/'>
                <HomeScreen getUserInfo={getUserInfo} />
              </Route>
              <Route path='/profile'>
                <ProfileScreen />
              </Route>
              <Route path='/payment/:plan'>
                <Payment />
              </Route>
            </Switch>)
        }
      </Router>
    </div>
  );
}

export default App;
