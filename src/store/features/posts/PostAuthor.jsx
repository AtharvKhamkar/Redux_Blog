import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/Userslice';

const PostAuthor = ({ authorId }) => {
  const allAuthors = useSelector(selectAllUsers);
  const author = allAuthors.find((user) => user.id === authorId);

  return (
    <div className='flex'>
      <span>Author : </span>
      <span>{author?.name}</span>
    </div>
  );
};

export default PostAuthor;
