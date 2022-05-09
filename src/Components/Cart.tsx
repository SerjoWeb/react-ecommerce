/** Import React and dependencies */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/** Import React icons */
import { FaShoppingCart } from 'react-icons/fa';

/** import useStore global state */
import useStore from '../Stores/useStore';

/** Init Cart component */
const Cart: any = () => {
  /** Init Products Store */
  const { productsInCart } = useStore((state) => state);

  /** cart count */
  const [count, setCount] = useState(productsInCart.length);

  useEffect(() => {
    setCount(productsInCart.length);
  }, [productsInCart]);

  return (
    <div>
      <Link to="/cart" className="relative w-full h-auto">
        <FaShoppingCart
          fontSize={40}
          className="text-[#E46025] fill-[#E46025] hover:text-[#EA7B49] hover:fill-[#EA7B49]"
        />
        <div
          className="
          h-[20px] w-[20px] bg-[#449954] text-[13px] text-white flex justify-center 
          items-center rounded-full absolute top-0 left-[30px]
        "
        >
          {productsInCart.length}
        </div>
      </Link>
    </div>
  );
};

/** Export Cart component */
export default Cart;
