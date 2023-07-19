import { useEffect, useState } from 'react';
import styles from './OrderList.module.css';
import {
  TablePagination,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import convertMoney from '../../convertMoney';
import CheckoutAPI from '../../API/CheckoutAPI';

const OrderList = ({ getInfo }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const location = useLocation();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const getOrderList = async () => {
    const res = await CheckoutAPI.getOrderList();
    if (location.pathname === '/admin/orders') setOrders(res);
    else {
      setOrders(res.slice(0, 8));
      setPage(0);
    }
  };

  useEffect(() => {
    getOrderList();
  }, [location.pathname]);
  const ordersByMonth = async (month) => {
    // const res = await fetch(`http://localhost:5000/orders/month/${month}`, {
    //   credentials: 'include',
    // });
    // const data = await res.json();
    const data = await CheckoutAPI.getOrderByMonth(month);
    setOrders(data);
    const earnThisMonth = data.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    getInfo(convertMoney(earnThisMonth), data.length);
  };
  const monthChangeHandler = async (event) => {
    const month = event.target.value;
    ordersByMonth(month);
  };

  return (
    <div className={styles.Container}>
      <h3>Lastest Order</h3>
      <label>
        Month{' '}
        <input type={'month'} onChange={monthChangeHandler} min='2022-01' />
      </label>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell padding='none'>
                <input type={'checkbox'} />
              </TableCell>
              <TableCell padding='none'>ID</TableCell>
              <TableCell padding='none'>User</TableCell>
              <TableCell padding='none'>Phone</TableCell>
              <TableCell padding='none'>Address</TableCell>
              <TableCell padding='none'>Total</TableCell>
              <TableCell padding='none'>Delivery</TableCell>
              <TableCell padding='none'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.slice(page * 8, page * 8 + 8).map((order) => (
              <TableRow
                key={order._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding='none'>
                  <input type={'checkbox'} />
                </TableCell>
                <TableCell padding='none'>{order._id}</TableCell>
                <TableCell padding='none'>{order.fullname}</TableCell>
                <TableCell padding='none'>{order.phone}</TableCell>
                <TableCell padding='none'>{order.address}</TableCell>
                <TableCell padding='none'>
                  {convertMoney(order.total)}
                </TableCell>
                <TableCell padding='none'>Chua van chuyen</TableCell>

                <TableCell padding='none'>Chua thanh toan</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[8]}
                count={orders.length}
                rowsPerPage={8}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default OrderList;
