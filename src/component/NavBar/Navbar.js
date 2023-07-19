import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useContext } from 'react';
import LogInContext from '../../store/LogInContex';
import UserAPI from '../../API/UserAPI';

const Navbar = (props) => {
  const LogInCTX = useContext(LogInContext);

  const activeClass = ({ isActive }) => {
    if (isActive) return styles.active;
    return '';
  };
  return (
    <div className={styles.Container}>
      <div>
        <NavLink to={'/'} className={activeClass}>
          Home
        </NavLink>
        <NavLink to={'/admin'} className={activeClass}>
          Admin
        </NavLink>
        <NavLink to={'/chat'} className={activeClass}>
          Chat
        </NavLink>
      </div>
      {!LogInCTX.isLogin && (
        <div>
          <NavLink to={'/login'} className={activeClass}>
            Log In
          </NavLink>
        </div>
      )}
      {LogInCTX.isLogin && (
        <div>
          <span>
            {LogInCTX.curUser.fullname} ({LogInCTX.curUser.role})
          </span>
          <NavLink
            to={'/'}
            // className={activeClass}
            onClick={() => {
              LogInCTX.LogOut();
              UserAPI.postLogOut();
              localStorage.clear();
            }}
          >
            Log Out
          </NavLink>
        </div>
      )}
    </div>
  );
};
export default Navbar;
