import { useEffect, useRef, useState } from 'react';
import styles from './ProductsList.module.css';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import ProductAPI from '../../API/ProductAPI';
import convertMoney from '../../convertMoney';

const ProductsList = (props) => {
  const searchRef = useRef();
  const [products, SetProducts] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const getProduct = async () => {
    const res = await ProductAPI.getAPI();
    SetProducts(res);
  };
  // set state khi mount
  useEffect(() => {
    getProduct();
  }, []);
  // search
  const searchProducts = async (event) => {
    const res = await ProductAPI.getPagination(
      `?search=${searchRef.current.value}&category=all`
    );
    SetProducts(res);
  };
  // button onClick
  const deleteProductHandler = async (event) => {
    prompt('Are you sure?');
    const id = event.target.dataset.id;
    const res = await ProductAPI.delProduct(id);
    SetProducts(res);
  };

  const editProductHandler = (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    navigate('/admin/editproduct', { state: { id: id } });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div className={styles.Container}>
      <div className={styles.header}>
        <h3>Products List</h3>
        <button
          onClick={() => {
            navigate('/admin/newproduct');
          }}
        >
          Add new
        </button>
      </div>
      <div>
        <input type={'text'} placeholder='Enter serch!' ref={searchRef}></input>
        <button onClick={searchProducts}>Search</button>
      </div>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <input type={'checkbox'} />
            </TableCell>
            <TableCell padding='none'>ID</TableCell>
            <TableCell padding='none'>Name</TableCell>
            <TableCell padding='none'>Price</TableCell>
            <TableCell padding='none'>Image</TableCell>
            <TableCell padding='none'>Category</TableCell>
            <TableCell padding='none'>Count</TableCell>
            <TableCell padding='none'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.slice(page * 5, page * 5 + 5).map((product) => (
            <TableRow key={product._id}>
              <TableCell padding='none'>
                <input type={'checkbox'} />
              </TableCell>
              <TableCell padding='none'>{product._id}</TableCell>
              <TableCell padding='none'>{product.name}</TableCell>
              <TableCell padding='none'>
                {convertMoney(product.price)}
              </TableCell>
              <TableCell padding='none'>
                <img src={product.img1} width='50px'></img>
              </TableCell>
              <TableCell padding='none'>{product.category}</TableCell>
              <TableCell padding='none'>{product.count}</TableCell>
              <TableCell padding='none'>
                <button
                  onClick={deleteProductHandler}
                  data-id={product._id}
                  className={styles.delBtn}
                >
                  Delete
                </button>
                <button
                  onClick={editProductHandler}
                  data-id={product._id}
                  className={styles.editBtn}
                >
                  Edit
                </button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              count={products.length}
              rowsPerPage={5}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default ProductsList;
