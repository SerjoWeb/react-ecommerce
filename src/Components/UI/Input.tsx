/** Import React */
import React from 'react';

/** Import react icons */
import { AiOutlineSearch } from 'react-icons/ai';

/**
 * Init Input component with income props from outside
 * Set types for props
 **/
const Input: any = ({
  type,
  name,
  placeholder,
  value,
  classProps,
  onChangeHandler
}: {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  classProps: string;
  onChangeHandler: any;
}) => {
  /** Return JSX */
  return (
    <div
      className="
      flex justify-between items-center
      max-h-[52px] max-w-[631px] py-[15px] px-[26px]
      bg-[#5A5C66] text-[#B2B7BF]
    "
    >
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        className={`
          w-full flex-1 bg-transparent border-0
          text-sm w-full focus:outline-0 p-0 m-0 pr-[10px]
          ${classProps}
        `}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <AiOutlineSearch fontSize={20} />
    </div>
  );
};

/** Export Input component */
export default Input;
