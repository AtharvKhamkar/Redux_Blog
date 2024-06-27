import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import PostAuthor from './PostAuthor';
import PostReaction from './PostReaction';
import { deletePost, selectSinglePost } from './PostSlice';
import TimeAgo from './TimeAgo';

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectSinglePost(state, Number(postId)));

  const deletePostHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(deletePost(post)).unwrap();
      navigate('/');
    } catch (error) {
      console.log(`error while deleting the post ${error}`);
    }
  };

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className='flex flex-col w-full min-h-screen bg-slate-400 p-4  items-center'>
      <div className='bg-slate-800 text-white m-2 p-4 rounded-lg w-1/2'>
        <h1 className='text-5xl font-semibold py-2 cursor-pointer'>
          {post.title}
        </h1>
        <div className='flex justify-between py-2'>
          <h3 className='text-2xl'>{post?.body || post.content}</h3>
        </div>
        <div className='flex justify-between'>
          <TimeAgo timestamp={post.date} />
          <PostAuthor authorId={post.userId} />
          <PostReaction post={post} />
        </div>
        <div className='flex justify-end py-4'>
          <Button onClick={() => navigate(`/post/edit/${post.id}`)}>
            Edit
          </Button>
          <Button onClick={deletePostHandler}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
