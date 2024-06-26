import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import PostReaction from './PostReaction';
import TimeAgo from './TimeAgo';

const PostExerts = ({ post }) => {
  return (
    <div
      key={post.id || index}
      className='bg-slate-800 text-white m-2 p-4 rounded-lg w-1/2'
    >
      <Link
        to={`/post/${post.id}`}
        className='justify-center items-center flex flex-col w-full'
      >
        <h1 className='text-5xl font-semibold py-2 cursor-pointer'>
          {post.title}
        </h1>
        <div className='flex justify-between py-2'>
          <h3 className='text-2xl'>{post?.body || post.content}</h3>
        </div>
      </Link>
      <div className='flex justify-between'>
        <TimeAgo timestamp={post.date} />
        <PostAuthor authorId={post.userId} />
        <PostReaction post={post} />
      </div>
    </div>
  );
};

export default PostExerts;
