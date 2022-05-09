/** Import React and hooks */
import React, { useEffect } from 'react';

/**
 * Init Button component with income props from outside
 * Set types for props
 **/
const Button: any = ({
  type,
  name,
  content,
  classProps,
  buttonHandler,
  disabled,
  product
}: {
  type: any;
  name: string;
  content: string;
  classProps: string;
  buttonHandler: any;
  disabled: boolean;
  product: boolean;
}) => {
  useEffect(() => {}, [disabled]);

  /** Return JSX */
  return (
    <button
      type={type}
      name={name}
      className={`
            w-full py-[7px] px-[15px] m-0 border-0 active:outline-0 focus:outline-0 
            text-white text-sm text-center rounded disabled:opacity-40 disabled:cursor-not-allowed ${classProps}
        `}
      onClick={buttonHandler}
      disabled={disabled}
    >
      {!disabled ? content : 'In A Cart'}
    </button>
  );
};

/** Export Button component */
export default Button;
