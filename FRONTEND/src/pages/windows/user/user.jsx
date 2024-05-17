import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../../../redux/features/logInLogout/authenticationSlice.jsx';
import {setUser} from '../../../redux/features/userData/userDataSlice.jsx';
import {clearUser} from '../../../redux/features/userData/userDataSlice.jsx';
import pr from "./profile-avatar.jpeg";
import './user.css';

function Userspage() {
    const path = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.Authentication.isAuthenticated);

    const [userData, setUserData] = useState();

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (isAuthenticated) {
            setUserData(storedUserData);
            dispatch(setUser());
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        alert("Log Out?");
        localStorage.clear();
        dispatch(setIsAuthenticated());
        dispatch(clearUser());
        path("/");
      };
    return (
        <>
        <div id='user-outer-div'>
            <div id='user-left-div'>
                <div id='user-profile-div'>
                    <div id='user-profile-pic-div'><img src={pr} ></img></div>
                    <div id='user-profile-name-div'>
                        <div id='user-profile-name-div-1'><p>Hellow,</p></div>
                        <div id='user-profile-name-div-2'><p></p></div>
                    </div>
                </div>

                <div className='class-user-left-child-divs-single-element' id='user-myorder-div'
                    onClick={() => { rightDivMenu("MyOrders") }}>
                    <i class="fa-solid fa-folder fa-2xl" style={{ color: "Dodgerblue" }}></i>
                    <p id='user-myorder-div-p1'>MY ORDERS</p>
                </div>

                <div className="class-user-left-child-divs" id='user-accountsettings-div'>
                    <div className="class-user-left-child-divs-c1" id='user-accountsettings-div-1' >
                        <i class="fa-solid fa-user fa-2xl" style={{ color: "Dodgerblue" }}></i>
                        <p>ACCOUNT SETTINGS</p>
                    </div>
                    <div className="class-user-left-child-divs-c2" id='user-accountsettings-div-2'>
                        <p id='user-accountsettings-div-2-p1'>Profile Information</p>
                        <p id='user-accountsettings-div-2-p2'>Manage Address</p>
                        <p id='user-accountsettings-div-2-p3'>Pan Card Information</p>
                    </div>
                </div>



                <div className="class-user-left-child-divs" id='user-payment-div'>
                    <div className="class-user-left-child-divs-c1" id='user-payment-div-1'>
                        <i class="fa-solid fa-wallet fa-2xl" style={{ color: "Dodgerblue" }}></i>
                        <p>PAYMENTS</p>
                    </div>
                    <div className="class-user-left-child-divs-c2" id='user-payment-div-2'>
                        <p id="user-payment-div-2-p1">Gift Cards</p>
                        <p id="user-payment-div-2-p2">UPI Information</p>
                        <p id="user-payment-div-2-p3">Saved Cards</p>
                    </div>
                </div>


                <div className="class-user-left-child-divs" id='user-mystuff-div'>
                    <div className="class-user-left-child-divs-c1">
                        <i class="fa-solid fa-user-secret fa-2xl" style={{ color: "Dodgerblue" }}></i>
                        <p>MY STUFFS</p>
                    </div>
                    <div className="class-user-left-child-divs-c2">
                        <p id="user-mystuff-div-p1">My Coupons</p>
                        <p id="user-mystuff-div-p2">My Review And Ratings</p>
                        <p id="user-mystuff-div-p3">All Notification</p>
                        <p id="user-mystuff-div-p4">My WishList</p>
                    </div>
                </div>

                <div className="class-user-left-child-divs-single-element" id='user-logout-div'  onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket fa-2xl" style={{ color: "Dodgerblue" }}></i>
                    <p id='user-logout-div-p1'>LOG OUT</p>
                </div>
            </div>
            <div id='user-right-div'>HELOW THIS IS RIGHT DIV</div>
        </div >
    </>
    );
}

export default Userspage;


