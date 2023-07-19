import { useContext, useRef } from 'react';
import styles from './LogIn.module.css';
import { useNavigate } from 'react-router-dom';
import LogInContext from '../../store/LogInContex';
import UserAPI from '../../API/UserAPI';
import queryString from 'query-string';

const LogIn = (props) => {
  const emailRef = useRef();
  const PasswordRef = useRef();
  const navigate = useNavigate();
  const LogInCTX = useContext(LogInContext);
  const LogInHandler = (event) => {
    event.preventDefault();
    const LogInAsAdmin = async () => {
      const params = {
        email: emailRef.current.value,
        password: PasswordRef.current.value,
      };
      const query = '?' + queryString.stringify(params);
      try {
        const res = await UserAPI.postLogIn(query);
        LogInCTX.LogIn();
        LogInCTX.getCurUser(res);
        navigate('/admin');
      } catch (error) {
        console.log(error.response);
        alert(error.response.statusText);
      }
    };
    LogInAsAdmin();
  };
  return (
    <>
      <div>
        <div className={styles.container}>
          <h1>Log In</h1>
          <form onSubmit={LogInHandler}>
            <input type={'email'} placeholder={'Email'} ref={emailRef} />
            <input
              type={'password'}
              placeholder={'Password'}
              ref={PasswordRef}
            />
            <button type='submit'>LogIn</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default LogIn;
