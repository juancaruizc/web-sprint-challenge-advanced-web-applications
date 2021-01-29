import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const { push } = useHistory();
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', loginValues)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        push('/bubbles');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>
        Welcome to the Bubble App!
        {/* <p>Build a login page here</p> */}
      </h1>
      <form onSubmit={login}>
        <label htmlFor='username'>
          Username
          <input
            id='username'
            type='text'
            value={loginValues.username}
            onChange={handleChanges}
            name='username'
          ></input>
        </label>

        <label htmlFor='password'>
          Password
          <input
            id='password'
            type='text'
            value={loginValues.password}
            onChange={handleChanges}
            name='password'
          ></input>
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
