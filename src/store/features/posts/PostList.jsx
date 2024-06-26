import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostAuthor from './PostAuthor';
import PostReaction from './PostReaction';
import { selectAllPosts } from './PostSlice';
import TimeAgo from './TimeAgo';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-5xl text-white font-bold'>Posts</h2>
      {posts &&
        posts.map((post, index) => (
          <div
            key={post.id || index}
            className='bg-slate-800 text-white m-2 p-2 rounded-lg w-1/2'
          >
            <h1 className='text-5xl font-semibold'>{post.title}</h1>
            <div className='flex justify-between'>
              <h3 className='text-2xl'>{post.content}</h3>
              <PostAuthor authorId={post.userId} />
            </div>
            <TimeAgo timestamp={post.date} />
            <PostReaction post={post} />
          </div>
        ))}
    </div>
  );
};

export default PostList;
