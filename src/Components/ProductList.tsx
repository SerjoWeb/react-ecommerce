/** Import React */
import React from 'react';

/** Import components */
import ProductCard from './ProductCard';
import Loader from './UI/Loader';

/** Init ProductList component */
const ProductList: any = ({
  addToCart,
  deleteFromCart,
  products
}: {
  addToCart: any;
  deleteFromCart: any;
  products: any;
}) => {
  return (
    <div className="w-full flex flex-wrap justify-around items-start">
      {products && products.length ? (
        products.map((product: any, index: number) => (
          <ProductCard
            key={index}
            product={product}
            addToCart={addToCart}
            deleteFromCart={deleteFromCart}
          />
        ))
      ) : (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

/** Export ProductList component */
export default ProductList;
