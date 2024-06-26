import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/Userslice';
import { postAdded } from './PostSlice';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    console.log('button clicked');

    dispatch(postAdded(title, content, userId));
    setTitle('');
    setContent('');
    setUserId('');
  };

  return (
    <div className='flex flex-col justify-center items-center p-4 border-lg bg-slate-800 w-1/2 m-auto rounded-lg text-white border-white'>
      <form onSubmit={handlePostSubmit}>
        <div className='flex justify-between items-center px-2 py-4 text-xl'>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            placeholder='Title'
            value={title}
            className='text-slate-900 rounded-md py-2 text-center'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center px-2 py-4 text-xl '>
          <label htmlFor='content'>Content:</label>
          <input
            id='content'
            type='text'
            placeholder='Content'
            value={content}
            className='text-slate-900 rounded-md py-2 text-center'
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className='flex justify-between items-center px-2 py-4 text-xl '>
          <label htmlFor='user_list'>Author:</label>
          <select
            id='user_list'
            value={userId}
            className='text-slate-900'
            onChange={(e) => setUserId(e.target.value)}
          >
            {users &&
              users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  className='text-slate-900'
                >
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <div className='flex items-center justify-center bg-gray-950 hover:bg-gray-300 rounded-lg py-2'>
          <button type='submit' className='w-full rounded-md '>
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
