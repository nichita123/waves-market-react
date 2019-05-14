import React from 'react';

import MyButton from '../utils/button';
import Login from './Login';

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique nulla vero unde, iste molestiae quod, repudiandae exercitationem quos natus consequatur, nemo animi ipsum dicta error architecto incidunt eaque! Molestias, eligendi.</p>
            <MyButton 
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
              altClass="signup_button"
            />
          </div>

          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterLogin;