/** Import React & depends */
import React, { useState, useEffect } from 'react';

/** Import components */
import ProductList from '../Components/ProductList';
import Loader from '../Components/UI/Loader';
import LocalStorageNotify from '../Components/LocalStorageNotify';

/** import useStore global state */
import useStore from '../Stores/useStore';

/** Init Products Component */
const Products: any = () => {
  /** Init Products Store */
  const {
    products,
    users,
    addUser,
    setUsers,
    setProducts,
    addToCartDB,
    removeFromCartDB,
    getCartProducts,
    productsInCart
  } = useStore((state) => state);

  /** Init States */
  const [isFetching, setIsFetching] = useState(false);

  /** init user auth */
  const [auth, setAuth] = useState(false);

  /** init user auth */
  const [auth2, setAuth2] = useState(false);

  /** get all products from DB and set state */
  useEffect(() => {
    setIsFetching(true);
    setUsers();
    setProducts();
    setIsFetching(false);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('ECommerce-user')) {
      const user: any = localStorage.getItem('ECommerce-user');
      const parseUser: any = JSON.parse(user)[0];
      getCartProducts(parseUser);
    }
  }, [productsInCart]);

  /** set auth */
  const addUserDB: any = () => {
    addUser();
    setAuth(true);
  };

  /** auth done */
  const authDone: any = () => {
    if (!localStorage.getItem('ECommerce-user')) {
      localStorage.setItem('ECommerce-user', JSON.stringify(users));
    }
    setAuth2(true);
  };

  /** function add particular product to cart */
  const addToCart: any = (product: any) => {
    if (localStorage.getItem('ECommerce-user')) {
      const user: any = localStorage.getItem('ECommerce-user');
      const parseUser: any = JSON.parse(user)[0];
      addToCartDB(product, parseUser);
    }
  };

  /** Delete from cart */
  const deleteFromCart: any = (product: any) => {
    if (localStorage.getItem('ECommerce-user')) {
      const user: any = localStorage.getItem('ECommerce-user');
      const parseUser: any = JSON.parse(user)[0];
      removeFromCartDB(product, parseUser);
    }
  };

  return (
    <div className="mt-[30px] w-full">
      {!isFetching ? (
        <ProductList addToCart={addToCart} deleteFromCart={deleteFromCart} products={products} />
      ) : (
        <Loader />
      )}
      {!auth && !auth2 && !localStorage.getItem('ECommerce-user') ? (
        <LocalStorageNotify
          setAuth={addUserDB}
          text="Hello, we glad to greeting you. To start buying online through our shop, please, click the button - I'm Agree. We guarantee that we are not process your data."
          btnLabel="I'm Agree"
          btnName="auth-db"
        />
      ) : (
        ''
      )}
      {auth && !auth2 && !localStorage.getItem('ECommerce-user') ? (
        <LocalStorageNotify
          setAuth={authDone}
          text="All Done! Happy Shopping :)"
          btnLabel="Ok"
          btnName="auth-ok"
        />
      ) : (
        ''
      )}
    </div>
  );
};

/** Export Products component */
export default Products;
