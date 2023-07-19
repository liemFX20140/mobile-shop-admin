import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserAPI from '../../API/UserAPI';
import LogInContext from '../../store/LogInContex';
import styles from './AdminPage.module.css';

const AdminPage = (props) => {
  const navigate = useNavigate();
  const LogInCTX = useContext(LogInContext);
  const [client, setClient] = useState();
  useEffect(() => {
    const getClient = async () => {
      const res = await UserAPI.getClient();
      setClient(res);
    };
    getClient();
  }, []);
  return (
    <div className={styles.Container}>
      <div className={styles.sideBar}>
        <h2>Admin Page</h2>
        <p>Main</p>
        <button
          onClick={() => {
            navigate('/admin/dashBoard');
          }}
        >
          Dashboard
        </button>
        <p>Lists</p>
        <button>Users</button>
        <button
          onClick={() => {
            navigate('/admin/products');
          }}
        >
          Products
        </button>

        <button onClick={() => navigate('/admin/orders')}>Order</button>
        <p>new</p>
        <button onClick={() => navigate('/admin/newproduct')}>
          New Product
        </button>
        <p>user</p>
        <button
          onClick={() => {
            LogInCTX.LogOut();
          }}
        >
          Logout
        </button>
      </div>
      <div className={styles.dashBoard}>
        <div className={styles.InfoBoard}>
          <div className={styles.InfoCard}>
            <h4>Client</h4>
            <p>{client}</p>
          </div>
          <div className={styles.InfoCard}>
            <h4>Monthly Earning</h4>
            <p>{props.earning}</p>
          </div>

          <div className={styles.InfoCard}>
            <h4>New Order</h4>
            <p>{props.orders}</p>
          </div>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
