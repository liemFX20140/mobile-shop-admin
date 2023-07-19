import styles from './NewProduct.module.css';
import { useRef, useState } from 'react';

import ProductAPI from '../../API/ProductAPI';
const NewProduct = (props) => {
  const nameRef = useRef();
  const categoryRef = useRef();
  const short_descRef = useRef();
  const long_descRef = useRef();
  const imgRef = useRef();
  const priceRef = useRef();
  const [data, setData] = useState(null);

  const formData = new FormData();
  const onImgChange = (event) => {
    console.log(event.target.files);
    const files = [...event.target.files];
    files.forEach((file) => formData.append('image', file));

    setData(formData);
  };
  const addProductHandler = (event) => {
    event.preventDefault();

    const addToDB = async () => {
      setData((prev) => {
        prev.append('name', nameRef.current.value);
        prev.append('price', priceRef.current.value);
        prev.append('short_desc', short_descRef.current.value);
        prev.append('long_desc', long_descRef.current.value);
        prev.append('category', categoryRef.current.value);
      });

      const res = ProductAPI.addNewProduct(null, data);
      if (res.status === 501) alert(res);
    };
    if (
      nameRef.current.value &&
      short_descRef.current.value &&
      imgRef.current.value &&
      long_descRef.current.value &&
      priceRef.current.value
    ) {
      addToDB();
    } else {
      alert('Dien du thong tin');
    }
  };
  return (
    <div className={styles.Container}>
      <h3>Add New Product</h3>
      <form
        onSubmit={addProductHandler}
        className={styles.form}
        encType='multipart/form-data'
      >
        <div className={styles.firstRow}>
          <div className={styles.firstCol}>
            <label>
              Name
              <input
                type={'text'}
                name='name'
                placeholder={'Product Name'}
                ref={nameRef}
              />
            </label>

            <label>
              Short Decription
              <input
                type={'text'}
                placeholder={' Short Decription'}
                ref={short_descRef}
                name='short_desc'
              />
            </label>

            <label>
              Upload 4 Images
              <input
                type={'file'}
                ref={imgRef}
                multiple
                name='image'
                onChange={onImgChange}
              />
            </label>
          </div>
          <div className={styles.SecCol}>
            <label>
              Price
              <input
                type={'number'}
                placeholder={'1.000.000 vnd'}
                ref={priceRef}
                name='price'
              />
              <label>
                Category{' '}
                <input
                  type={'text'}
                  placeholder={'Category'}
                  ref={categoryRef}
                  name='category'
                />
              </label>
            </label>
          </div>
        </div>
        <label>
          Long Decription
          <textarea
            rows={4}
            cols={100}
            type={'text'}
            placeholder={'Long Decription'}
            ref={long_descRef}
          />
        </label>

        <button type={'submit'}>Send</button>
      </form>
    </div>
  );
};
export default NewProduct;
