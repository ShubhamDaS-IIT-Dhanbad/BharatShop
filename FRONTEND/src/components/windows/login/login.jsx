import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../../../redux/features/logInLogout/authenticationSlice.jsx';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const hist = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:12000/api/v1/account/login', {
                "mobileNumber": mobileNumber
            });
            setIsLoading(false);
            if (response.status === 200) {
                console.log(response.data.data.user)
                console.log('Login successful');
                localStorage.setItem('userData', JSON.stringify(response.data.data.user));
                dispatch(setIsAuthenticated());
                hist("/");
            } else {
                setError('Login failed');
            }
        } catch (error) {
            setIsLoading(false);
            setError('Error: ' + error.message);
        }
    };

    return (
        <div id='login-parentcontainer'>
            <div id="container">
                <div id="logincontainer">
                    <div id="leftform">
                        <form id="leftformform" onSubmit={handleSubmit}>
                            <h1>Log In</h1>
                            {error && <div className="error">{error}</div>}
                            <div id="social_media_logo">
                                <Link to="https://www.google.com/">
                                    <i className="fa-brands fa-google-plus-g" />
                                </Link>
                                <Link to="/" >
                                    <i className="fa-brands fa-facebook-f" />
                                </Link>
                                <Link to="/">
                                    <i className="fa-brands fa-github" />
                                </Link>
                                <Link to="/">
                                    <i className="fa-brands fa-Linkedin-in" />
                                </Link>
                            </div>
                            <input type="tel" placeholder="Mobile Number" value={mobileNumber} onChange={(e) => setmobileNumber(e.target.value)} required />
                            <Link to="/" id="forget_mobileNumber">
                                Forget Your mobileNumber?
                            </Link>
                            <button type="submit" id="login_button">{isLoading ? 'Logging in...' : 'Log In'}</button>
                        </form>
                    </div>
                    <div className="signup-class">
                        <button id="toggle-signup-button"><Link className="loginlink_properties" to="/signup">SIGN UP</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

