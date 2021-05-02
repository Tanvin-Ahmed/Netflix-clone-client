import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import './ProfileScreen.css';
import avatar from '../../img/avatar/Netflix-avatar.png';
import { auth } from '../SignInScreen/LoginManager';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import axios from 'axios';

const ProfileScreen = () => {
    const User = useSelector(selectUser);
    const [user, setUser] = useState({});
    const history = useHistory();

    const getUserInfo = async (email) => {
        console.log(email)
        await axios(`https://boiling-bayou-07410.herokuapp.com/getCurrentUser/${email}`)
        .then(data => {
            setUser(data.data)
        })
        .catch(err => console.error(err));
    }

    const handleCancelPlan = async (id, email) => {
        await fetch(`https://boiling-bayou-07410.herokuapp.com/cancelPlan/${id}`, {
            method: 'DELETE',
            Headers: {'Content-Type':'application/json'}
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                getUserInfo(email);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUserInfo(User?.email);
        return getUserInfo;
    }, []);

    return (
        <div className="profileScreen">
            <NavBar />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src={avatar} alt="" />
                    <div className="profileScreen__details">
                        <h2>{user?.email || User?.email}</h2>
                        <div className="profileScreen__plans">
                            <h3 className="selected__plan">Current Plan: <span style={{ color: 'tomato' }}>{(user.plan || User?.plan) ? `${user.plan || User?.plan}` : 'No plan'}</span></h3>
                            <h3>Renewal Date: {`${(user?.expireDate || User?.expireDate) ? new Date(user?.expireDate).toLocaleDateString() : '0/00/0000'}`}</h3>
                            <div className="profileScreen__plan">
                                <div className="package">
                                    <h4>Netflix Basic</h4>
                                    <small>480p</small>
                                </div>
                                <div className="profileScreenPlan__button">
                                    {
                                        user.plan === 'basic' ?
                                            <button onClick={() => handleCancelPlan(user._id, (user?.email || User?.email))} className="cancel_button">Cancel Subscription</button>
                                            :
                                            <button onClick={() => history.push('/payment/basic')}>Subscribe</button>
                                    }
                                </div>
                            </div>
                            <div className="profileScreen__plan">
                                <div className="package">
                                    <h4>Netflix Standard</h4>
                                    <small>1080p</small>
                                </div>
                                <div className="profileScreenPlan__button">
                                    {
                                        user.plan === 'standard' ?
                                            <button onClick={() => handleCancelPlan(user._id, (user?.email || User?.email))} className="cancel_button">Cancel Subscription</button>
                                            :
                                            <button onClick={() => history.push('/payment/standard')}>Subscribe</button>
                                    }
                                </div>
                            </div>
                            <div className="profileScreen__plan">
                                <div className="package">
                                    <h4>Netflix Premium</h4>
                                    <small>4K + HDR</small>
                                </div>
                                <div className="profileScreenPlan__button">
                                    {
                                        user.plan === 'premium' ?
                                            <button onClick={() => handleCancelPlan(user._id, (user?.email || User?.email))} className="cancel_button">Cancel Subscription</button>
                                            :
                                            <button onClick={() => history.push('/payment/premium')}>Subscribe</button>
                                    }
                                </div>
                            </div>
                            <button onClick={() => auth.signOut()} className="profileScreen__signOut">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;