import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostExerts from './PostExerts';
import {
  fetchPosts,
  selectAllPosts,
  selectPostStatus,
  selectPostsError,
} from './PostSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectPostStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let renderedPosts;
  if (status === 'pending') {
    renderedPosts = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    renderedPosts = posts.map((post) => <PostExerts post={post} />);
  } else if (status === 'failed') {
    renderedPosts = <p>{error}</p>;
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-5xl text-white font-bold'>Posts</h2>
      {renderedPosts}
    </div>
  );
};

export default PostList;
