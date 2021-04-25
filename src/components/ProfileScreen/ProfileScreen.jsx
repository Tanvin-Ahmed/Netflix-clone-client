import React from 'react';
import NavBar from '../NavBar/NavBar';
import './ProfileScreen.css';
import avatar from '../../img/avatar/Netflix-avatar.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { auth } from '../SignInScreen/LoginManager';

const ProfileScreen = () => {
    const user = useSelector(selectUser);
    return (
        <div className="profileScreen">
            <NavBar />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src={avatar} alt="" />
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3 className="selected__plan">Plans(Current Plan: Premium)</h3>
                            <h3>Renewal Date:</h3> 
                            <div className="profileScreen__plan">
                                <div className="package">
                                    <h4>Netflix Standard</h4>
                                    <small>1080p</small>
                                </div>
                                <div className="profileScreenPlan__button">
                                    <button>Subscribe</button>
                                </div>
                            </div>
                            <div className="profileScreen__plan">
                                <div className="package">
                                    <h4>Netflix Basic</h4>
                                    <small>480p</small>
                                </div>
                                <div className="profileScreenPlan__button">
                                    <button>Subscribe</button>
                                </div>
                            </div>
                            <div className="profileScreen__plan">
                                <div className="package">
                                    <h4>Netflix Premium</h4>
                                    <small>1080p</small>
                                </div>
                                <div className="profileScreenPlan__button">
                                    <button>Subscribe</button>
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