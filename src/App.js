import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/NavBar/Navbar';
import LogIn from './pages/signup-login/LogIn';
import LogInContext from './store/LogInContex';
import { useEffect, useState } from 'react';
import AdminPage from './pages/admin/AdminPage';

import NewProduct from './component/NewProduct/NewProduct';
import EditProduct from './component/EditProduct/EditProduct';
import UserAPI from './API/UserAPI';
import ProductsList from './component/ProductsList/ProductsList';
import ChatAdmin from './pages/chat/ChatAdmin';
import OrderList from './component/OrderList/OrderList';
import convertMoney from './convertMoney';
import CheckoutAPI from './API/CheckoutAPI';

function App() {
  const [isLogin, setIsLogIn] = useState(false);
  const [curUser, setCurUser] = useState();
  const [earning, setEarning] = useState();
  const [orders, setOrders] = useState();
  const ordersByMonth = async (month) => {
    const data = await CheckoutAPI.getOrderByMonth(month);
    setOrders(data.length);

    const earnThisMonth = data.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    setEarning(convertMoney(earnThisMonth));
    console.log('running');
  };
  const getSessionLogin = async () => {
    const res = await UserAPI.getSessionSignIn();
    if (res) {
      setIsLogIn(true);
      setCurUser(res);
    }
  };
  useEffect(() => {
    getSessionLogin();
  }, []);
  useEffect(() => {
    const now = new Date(Date.now());
    const thisMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
    if (isLogin) ordersByMonth(thisMonth);
  }, [isLogin]);

  const defaultCTX = {
    isLogin,
    LogIn: () => {
      setIsLogIn(true);
    },
    LogOut: () => {
      setIsLogIn(false);
    },
    getCurUser: (curUser) => {
      setCurUser(curUser);
    },
    curUser,
  };

  const getInfo = (earn, orders) => {
    setEarning(earn);
    setOrders(orders);
  };
  return (
    <LogInContext.Provider value={defaultCTX}>
      <Navbar />
      <Routes>
        {isLogin && <Route path='/' element={<h1>Home Page</h1>}></Route>}
        {!isLogin && <Route path='/' element={<LogIn />}></Route>}
        {!isLogin && <Route path='/login' element={<LogIn />} />}
        {isLogin && (
          <Route
            path='/admin'
            element={<AdminPage earning={earning} orders={orders} />}
          >
            <Route path='dashBoard' element={<OrderList getInfo={getInfo} />} />
            <Route path='products' element={<ProductsList />} />
            <Route path='newproduct' element={<NewProduct />} />
            <Route path='orders' element={<OrderList getInfo={getInfo} />} />
            <Route path='editproduct' element={<EditProduct />} />
          </Route>
        )}
        {isLogin && <Route path='/chat' element={<ChatAdmin></ChatAdmin>} />}
        {!isLogin && (
          <Route
            path='/admin'
            element={
              <h1 style={{ textAlign: 'center', padding: '2rem' }}>
                Please Log In
              </h1>
            }
          />
        )}
      </Routes>
    </LogInContext.Provider>
  );
}

export default App;
