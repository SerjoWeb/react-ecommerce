/** Import React */
import React from 'react';
import { Link } from 'react-router-dom';

/** Import components */
import Cart from './Cart';

/** Init Header component */
const Header: any = () => {
  return (
    <header>
      <div className="w-full flex justify-between items-center border-b-[1px] border-[#474955] pb-[20px]">
        <div>
          <Link to="/" className="text-2xl">
            E-Commerce
          </Link>
        </div>
        <Cart />
      </div>
    </header>
  );
};

/** Export Header component */
export default Header;
