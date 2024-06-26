import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './PostSlice';

const PostReaction = ({ post }) => {
  const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
  };
  const dispatch = useDispatch();

  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          key={name}
          type='button'
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
          }
          className='pr-1'
        >
          {emoji}
          {post.reactions[name]}
        </button>
      ))}
    </div>
  );
};

export default PostReaction;
