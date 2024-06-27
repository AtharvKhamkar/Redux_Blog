import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAllUsers } from '../users/Userslice';
import { selectSinglePost, updatePost } from './PostSlice';

const PostEditForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectSinglePost(state, Number(postId)));

  if (!post) {
    return <p>Post not found...</p>;
  }

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [userId, setUserId] = useState(post.userId);
  const [requestStatus, setRequestStatus] = useState('idle');

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log('Edited post');

    try {
      setRequestStatus('pending');
      await dispatch(
        updatePost({
          id: post.id,
          title,
          body,
          reactions: post.reactions,
          userId: post.userId,
        })
      ).unwrap();
      setTitle('');
      setBody('');
      setUserId(0);
    } catch (error) {
      console.log(`Failed to update post`, error);
    } finally {
      setRequestStatus('idle');
      navigate(`/post/${post.id}`);
    }
  };
  return (
    <div className='w-full min-h-screen bg-slate-400 p-4'>
      <div className='flex flex-col justify-center items-center p-2 border-lg bg-slate-800 w-1/2 m-auto rounded-lg text-white border-white'>
        <form onSubmit={handlePostSubmit} className='w-full'>
          <div className='flex justify-between items-center px-2 py-8 text-xl'>
            <label htmlFor='title'>Title:</label>
            <input
              id='title'
              type='text'
              placeholder='Title'
              value={title}
              className='text-slate-900 rounded-md py-2 text-center w-4/5'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='flex justify-between items-center px-2 py-8 text-xl'>
            <label htmlFor='body'>Content:</label>
            <textarea
              id='body'
              type='text'
              placeholder='Content'
              value={body}
              className='text-slate-900 rounded-md py-2 text-center w-4/5 h-40'
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className='flex justify-between items-center px-2 py-8 text-xl '>
            <label htmlFor='user_list'>Author:</label>
            <select
              id='user_list'
              value={userId}
              itemType=''
              disabled={true}
              className='text-slate-900 rounded-lg p-2 w-4/5'
              onChange={(e) => setUserId(Number(e.target.value))}
            >
              {users &&
                users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                    className='text-slate-900 rounded-lg p-2'
                  >
                    {user.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='flex items-center justify-center bg-gray-950 hover:bg-gray-300 rounded-lg py-2'>
            <button
              type='submit'
              className='w-full rounded-md text-xl font-semibold'
            >
              Edit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditForm;
