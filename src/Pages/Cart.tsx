/** Import React & depends */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Import components */
import Breadcrumbs from '../Components/UI/Breadcrumbs';

/** Import components */
import ProductList from '../Components/ProductList';
import Button from '../Components/UI/Button';
import LocalStorageNotify from '../Components/LocalStorageNotify';

/** import useProducts global state */
import useProducts from '../Stores/useStore';

/** Init Cart component */
const Cart: any = () => {
  /** Init Products Store */
  const { productsInCart, getCartProducts, removeFromCartDB, applyPayment } = useProducts(
    (state) => state
  );

  /** Init prices state */
  const [rubTotal, setRubTotal] = useState(0);
  const [usdTotal, setUsdTotal] = useState(0);

  /** payment dialogue state */
  const [payment, setPayment] = useState(false);

  /** navigate redirect */
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('ECommerce-user')) {
      const user: any = localStorage.getItem('ECommerce-user');
      const parseUser: any = JSON.parse(user)[0];
      getCartProducts(parseUser);

      let _rubTotal = 0;
      let _usdTotal = 0;

      productsInCart.map((productInCart: any) => {
        _rubTotal += productInCart.priceRub;
        _usdTotal += productInCart.price;

        setRubTotal(_rubTotal);
        setUsdTotal(_usdTotal);
      });
    }
  }, [productsInCart]);

  /** Delete from cart */
  const deleteFromCart: any = (product: any) => {
    if (localStorage.getItem('ECommerce-user')) {
      const user: any = localStorage.getItem('ECommerce-user');
      const parseUser: any = JSON.parse(user)[0];
      removeFromCartDB(product, parseUser);
    }
  };

  /** payment */
  const paymentHandle: any = () => {
    if (localStorage.getItem('ECommerce-user')) {
      const user: any = localStorage.getItem('ECommerce-user');
      const parseUser: any = JSON.parse(user)[0];

      if (productsInCart.length) {
        productsInCart.map((productInCart: any) => {
          if (productInCart.count >= 1) {
            applyPayment(productsInCart, parseUser);
          }
        });

        setPayment(true);
      }
    }
  };

  const paymentDone: any = () => {
    navigate('/');
  };

  return (
    <div className="mt-[30px] w-full">
      <div className="w-full flex justify-between items-center">
        <Breadcrumbs />
        {productsInCart.length ? (
          <Button
            type="button"
            name="payment"
            content={`Payment: $${usdTotal} (${rubTotal} rub)`}
            classProps="bg-[#449954] hover:bg-[#58C16C]"
            buttonHandler={paymentHandle}
            disabled={false}
            product={false}
          />
        ) : (
          ''
        )}
      </div>
      <div className="mt-[30px] w-full">
        <ProductList
          addToCart={() => false}
          deleteFromCart={deleteFromCart}
          products={productsInCart}
        />
        {payment ? (
          <LocalStorageNotify
            setAuth={paymentDone}
            text="Thank's for buying our products! Have a great day!"
            btnLabel="Ok"
            btnName="payment-ok"
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

/** Export Cart component */
export default Cart;
