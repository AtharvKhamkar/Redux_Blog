import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const Header = () => {
  return (
    <div className='flex justify-between bg-slate-800 text-white m-auto p-6'>
      <h1 className='text-5xl font-bold'>Redux Blog Application</h1>
      <div className='flex'>
        <NavLink to={`/`}>
          <Button>Home</Button>
        </NavLink>
        <NavLink to={`/post`}>
          <Button>Post</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
