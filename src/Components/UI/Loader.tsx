/** Import React */
import React from 'react';

import { GiEmptyMetalBucketHandle } from 'react-icons/gi';

/** Init Loader component */
const Loader: any = () => {
  return (
    <div className="flex justify-start items-center">
      <GiEmptyMetalBucketHandle fontSize={20} className="text-[#474955] fill-[#474955]" />
      <span className="ml-[10px]">There are no products yet!</span>
    </div>
  );
};

/** Export Loader */
export default Loader;
