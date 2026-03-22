import React, { useState } from 'react';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import phone_icon from '../Assets/phone.png';
import './LoginSignUp.scss';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/loginSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { BASE_URL } from '../../utils/apiURL';
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google';

function LoginSignUp() {
  // Sign Up
  const [action, setAction] = useState('Login');
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobile] = useState('');
  const [emailError, setEmailError] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAPI = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/auth/authenticate/user`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();

      // Handle login response
      console.log('Login Response:', data);
      dispatch(loginUser(data));
      navigate('/');
    } catch (error) {
      showError();
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUpAPI = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // Handle sign-up response
      console.log('Sign Up Response:', data);
      dispatch(loginUser(data));
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
      showError();
    } finally {
      setLoading(false);
    }
  };

  const googleLoginAPI = async (googleResponse) => {
    try {
      const googleAccessToken = googleResponse.credential;
      const requestData = {googleAccessToken};
      setLoading(true);
      const response = await fetch(`${BASE_URL}/user/validate/google/token`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      console.log('GoogleLogin Response:', data);
      dispatch(loginUser({ ...data, isGoogleUser: true }));
      navigate('/');
    } catch (error) {
      console.error('Error during google login:', error);
      showError();
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (action === 'Login') {
      const userData = {
        email,
        password,
      };
      if (!email || !password) {
        setGlobalError('All fields are required.');
        return;
      }

      // Basic email validation
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        return;
      }
      loginAPI(userData); 
    } else {
      setAction('Login');
      resetFields();
    }
  };

  const handleSignUp = () => {
    if (action === 'Sign Up') {
      const userData = {
        name,
        email,
        password,
        mobileNumber,
      };

      if (!name || !email || !password || !mobileNumber) {
        setGlobalError('All fields are required.');
        return;
      }

      // Basic email validation
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        return;
      }

      if (!validateMobileNumber(mobileNumber)) {
        setMobileError('Please enter a valid mobile number.');
        return;
      }
      userData.role='User';

      signUpAPI(userData);
    } else {
      setAction('Sign Up');
      resetFields();
    }
  };

  const resetFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setMobile('');
    setEmailError('');
    setGlobalError('');
    setMobileError('');
  };

  const showError = () => {
    toast.error('Something went wrong, Please try after sometime.', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };
  const validateEmail = (inputEmail) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobileNumber);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setGlobalError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setGlobalError('');
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setGlobalError('');
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setGlobalError('');
    setMobileError('');
  };
  const responseMessage = (response) => {
    console.log(response);
    googleLoginAPI(response);
  };
  const errorMessage = (error) => {
      console.log(error);
      showError();
  };

  return (
    <div className='py-5 bg-whitesmoke'>
    <div className='auth-container'>
      <div>{loading ? <Loader/> : <div></div>}</div>
      
      <div className='auth-header'>
        <div className='auth-text'>{action}</div>
        <div className='auth-underline'> </div>
      </div>
      {globalError && <p className='global-error'>{globalError}</p>}
      <div className='auth-inputs'>
        {action === 'Login' ? (
          <div></div>
        ) : (
          <div className='auth-input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='User name'
              value={name}
              onChange={handleUsernameChange}
            />
          </div>
        )}

        <div className='auth-input'>
          <img src={email_icon} alt='' />
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        {emailError && <p className='validation-error'>{emailError}</p>}

        <div className='auth-input'>
          <img src={password_icon} alt='' />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        {action === 'Sign Up' && (
          <div className='auth-input'>
            <img  className='auth-imput-image' src={phone_icon} alt='' />
            <input
              type='tel'
              placeholder='Mobile number'
              value={mobileNumber}
              onChange={handleMobileChange}
              required
            />
          </div>
        )}
        {mobileError && <p className='validation-error'>{mobileError}</p>}
      </div>
      <div className='auth-submit-container'>
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={() => {
            handleSignUp();
          }}
        >
          Sign Up
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </div>
      </div>
      <div className='google-login-button-parent' >
            <GoogleLogin  onSuccess={responseMessage} onError={errorMessage} className='google-login-button' prompt='select_account' />
      </div>
    </div>
    </div>
  );
}

export default LoginSignUp;
