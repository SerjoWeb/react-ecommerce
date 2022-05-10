/** Import React */
import React from 'react';

/** Import components */
import Button from './UI/Button';

/** Init LocalStorageNotify component */
const LocalStorageNotify: any = ({
  setAuth,
  text,
  btnLabel,
  btnName
}: {
  setAuth: any;
  text: string;
  btnLabel: string;
  btnName: string;
}) => {
  return (
    <div className="w-full h-screen fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
      <div className="rounded p-[30px] text-center bg-white max-w-[400px] shadow-xl">
        <p className="text-sm text-center">{text}</p>
        <Button
          type="button"
          name={btnName}
          content={btnLabel}
          classProps="mt-[15px] bg-[#449954] hover:bg-[#58C16C]"
          buttonHandler={setAuth}
          disabled={false}
          product={false}
        />
      </div>
    </div>
  );
};

/** Export LocalStorageNotify */
export default LocalStorageNotify;
