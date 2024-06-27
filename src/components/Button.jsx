import React from 'react';

const Button = ({ children, ...prop }) => {
  return (
    <button
      className={`bg-slate-500 p-2 m-2 rounded-lg hover:bg-slate-600`}
      {...prop}
    >
      <span className='text-white text-2xl font-semibold'>{children}</span>
    </button>
  );
};

export default Button;
