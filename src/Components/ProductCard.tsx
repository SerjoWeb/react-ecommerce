/** Import React */
import React, { useEffect, useState } from 'react';

/** Import Icons */
import { AiFillStar } from 'react-icons/ai';

/** Import components */
import Button from './UI/Button';

/** import useProducts global state */
import useProducts from '../Stores/useStore';

/** Init ProductCard component */
const ProductCard: any = ({
  product,
  addToCart,
  deleteFromCart
}: {
  product: any;
  addToCart: any;
  deleteFromCart: any;
}) => {
  /** Init Products Store */
  const { productsInCart } = useProducts((state) => state);

  /** init state for in cart or not */
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const productCheck: any = productsInCart.filter((productInCart: any) => productInCart.uid === product.uid);
    productCheck.length ? setInCart(true) : setInCart(false);
  }, [productsInCart]);
  
  return (
    <>
      {product ? (
        <div className="w-full max-w-[270px] py-[15px] px-[10px] m-[5px] h-auto bg-white shadow-xl">
          <h3 className="text-lg mb-[10px]">{product.title}</h3>
          <div className="text-sm mb-[10px] text-[#868686]">{product.desc}</div>
          <div className="mb-[10px] flex justify-start items-start">
            <div className="text-sm text-[#868686]">
              <span className="text-lg text-[#E85228] font-bold">${product.price}</span>
              &nbsp;- (<span className="text-sm text-[#E85228] font-bold">{product.priceRub}</span>
              &nbsp;
              <span className="text-sm text-[#868686]">rub</span>)
            </div>
            <AiFillStar fontSize={15} className="text-[#F7E908] fill-[#F7E908] ml-[5px]" />
          </div>
          <div className="text-sm text-[#449954]">
            <span className="text-lg text-[#449954] font-bold">{product.count}</span>
            &nbsp; items available
          </div>
          {product.count <= 0 ? (
            <div className="text-sm text-left pt-[10px] border-t border-[#474955] mt-[10px] text-[#F75106]">
              This product is not available for a while. Our stock will collected soon.
            </div>
          ) : (
            <div className="w-full flex justify-between items-center mt-[20px]">
              {!inCart ? (
                <Button
                  type="button"
                  name="to-cart"
                  content="To Cart"
                  classProps="bg-[#E46025] ml-[5px] hover:bg-[#EA7B49]"
                  buttonHandler={() => addToCart(product)}
                  disabled={false}
                  product={product}
                />
              ) : ''}
              {inCart ? (
                <Button
                  type="button"
                  name="delete-from-cart"
                  content="Delete From Cart"
                  classProps="bg-[#E46025] ml-[5px] hover:bg-[#EA7B49]"
                  buttonHandler={() => deleteFromCart(product)}
                  disabled={false}
                  product={product}
                />
              ) : ''}
            </div>
          )}
        </div>
      ) : (
        <div className="text-lg text-center">Product does not exist!</div>
      )}
    </>
  );
};

/** Export ProductCard component */
export default ProductCard;
