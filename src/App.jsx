import './App.css';
import PostForm from './store/features/posts/PostForm';
import PostList from './store/features/posts/PostList';

function App() {
  return (
    <div className='w-full min-h-screen bg-slate-400 m-auto'>
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;
