import React, { useState } from 'react';
import './Login.css';
import logo from '../../img/logo/logo.png';
import SignInScreen from '../SignInScreen/SignInScreen';

const Login = () => {
    const [signIn, setSingIn] = useState(false);

    return (
        <div className="login">
            <div className="login__background">
                <img className="login__logo" src={logo} alt="" />
                <button onClick={() => setSingIn(true)} className="login__button" onClick>Sign In</button>
            </div>
            <div className="login__body">
                {
                    signIn ? <SignInScreen/> : (
                        <>
                            <h1>Unlimited movies, TV <br /> shows, and more.</h1>
                            <h2>Watch anywhere, Cancel at any time.</h2>
                            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                            <div className="login__input">
                                <form>
                                    <input type="email" placeholder="Email Address" />
                                    <button onClick={() => setSingIn(true)} className="login__getStarted">GET START</button>
                                </form>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Login;