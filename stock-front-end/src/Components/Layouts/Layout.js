import React from 'react';
import Navbar from './Navbar';

function Layout ({children, onInvestClick }){
  return (
    <>
      <Navbar onInvestClick={onInvestClick} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
