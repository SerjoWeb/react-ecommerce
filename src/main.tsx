/** Import react dependencies */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** Import styles */
import './index.css';

/** Import Components */
import Header from './Components/Header';

/** Import pages */
import Products from './Pages/Products';
import Cart from './Pages/Cart';

/** Create and init react app */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="w-full min-h-[100vh] flex justify-center items-start m-0 p-[30px]">
        <div className="max-w-[1232px] w-full p-[30px]">
          <Header />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*/*" element={<Products />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
