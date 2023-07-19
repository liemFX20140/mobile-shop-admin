import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import styles from './EditProduct.module.css';
import ProductApi from '../../API/ProductAPI';

const EditProduct = (props) => {
  const location = useLocation();
  const productId = location.state.id;
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const short_descRef = useRef();
  const long_descRef = useRef();
  const categoryRef = useRef();

  const [product, setProduct] = useState();

  const getProductbyID = async () => {
    const res = await ProductApi.getDetail(productId);
    setProduct(res);
  };

  useEffect(() => {
    getProductbyID();
  }, [productId]);

  const editProductHandler = (event) => {
    event.preventDefault();
    const editDataOnDB = async () => {
      const formData = new FormData();
      formData.append('name', nameRef.current.value);
      formData.append('category', categoryRef.current.value);
      formData.append('price', priceRef.current.value);
      formData.append('long_desc', long_descRef.current.value);
      formData.append('short_desc', short_descRef.current.value);
      const res = await ProductApi.editNewProduct(productId, formData);
      navigate('/admin/products');
    };
    if (
      nameRef.current.value &&
      categoryRef.current.value &&
      priceRef.current.value &&
      long_descRef.current.value &&
      short_descRef.current.value
    ) {
      editDataOnDB();
    } else {
      alert('Dien du thong tin');
    }
  };

  return (
    <div className={styles.Container}>
      <h3>Add New Product</h3>
      {product && (
        <form
          onSubmit={editProductHandler}
          className={styles.form}
          encType='multipart/form-data'
        >
          <div className={styles.firstRow}>
            <div className={styles.firstCol}>
              <label>
                Name
                <input
                  type={'text'}
                  defaultValue={product.name}
                  ref={nameRef}
                />
              </label>
            </div>
            <div className={styles.SecCol}>
              <label>
                Price
                <input
                  type={'number'}
                  defaultValue={product.price}
                  ref={priceRef}
                />
                <label>
                  Category{' '}
                  <input
                    type={'text'}
                    defaultValue={product.category}
                    ref={categoryRef}
                    name='category'
                  />
                </label>
              </label>
            </div>
          </div>
          <label>
            Short Decription
            <textarea
              cols={100}
              rows={5}
              defaultValue={product.short_desc}
              ref={short_descRef}
            />
          </label>
          <label>
            Long Decription
            <textarea
              rows={10}
              cols={100}
              type={'text'}
              defaultValue={product.long_desc}
              ref={long_descRef}
            />
          </label>
          <button type={'submit'}>Upadate</button>
        </form>
      )}
    </div>
  );
};
export default EditProduct;
