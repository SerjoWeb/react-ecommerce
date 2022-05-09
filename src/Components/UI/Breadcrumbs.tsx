/** Import React */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/** Init Breadcrumbs component */
const Breadcrumbs: any = () => {
  /** URL */
  const location: any = useLocation();
  const pathName: any = location.pathname;
  const pathNameSplitted: any = pathName.split('/');

  return (
    <div className="w-full flex justify-start items-center">
      <ul className="w-full p-0 m-0 list-none flex justify-start items-start">
        <li className="mr-[10px]">
          <Link to="/">Home</Link>
        </li>
        <li className="mr-[10px]">/</li>
        <li>
          <Link to={pathName}>
            {pathNameSplitted[1].charAt(0).toUpperCase() + pathNameSplitted[1].slice(1)}
          </Link>
        </li>
      </ul>
    </div>
  );
};

/** Export Breadcrumbs */
export default Breadcrumbs;
