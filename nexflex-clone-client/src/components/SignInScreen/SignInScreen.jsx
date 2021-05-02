import React, { useRef, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';
import './SignInScreen.css';

const SignInScreen = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const register = (e) => {
        e.preventDefault();
        const isValid = /\S+@\S+\.\S+/.test(emailRef.current.value);
        if (isValid) {
            if (passwordRef.current.value === confirmPasswordRef.current.value) {
                createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
                    .then(res => {
                        if (res.error) {
                            alert(res.error);
                        } else {
                            console.log(res);
                        }
                    })
            } else {
                alert('Confirmation Password is not Matched.')
            }
        } else {
            alert('Email address is badly formatted.');
        }
    }
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                console.log(res);
            }
        })
    }
    return (
        <div className="signInScreen">
            <form>
                <h1>{isSignIn ? "Sign In" : "Sign Up"}</h1>
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={passwordRef} type="password" placeholder="Password" />
                {
                    !isSignIn &&
                    <>
                        <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
                        <small style={{color: 'red', marginBottom: '1rem'}}>Password should be at least 6 characters</small>
                    </>
                }
                {
                    isSignIn ? <button onClick={signIn} type="submit">Sign In</button>
                        : <button onClick={register} type="submit">Sign Up</button>
                }

                <h4>
                    {
                        isSignIn ?
                            <>
                                <span className="signInScreen__gray">New to Netflix?</span>{' '}
                                <span onClick={() => setIsSignIn(false)} className="signInScreen__link">Sign Up now.</span>
                            </>
                            :
                            <>
                                <span className="signInScreen__gray">Already have an Account?</span>{' '}
                                <span onClick={() => setIsSignIn(true)} className="signInScreen__link">Sign In now.</span>
                            </>
                    }
                </h4>
            </form>
        </div>
    );
};

export default SignInScreen;