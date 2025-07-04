import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { postsService } from '../services/endpoints/posts';
import type { CreatePostRequest } from '../dto/request/posts';
import type { Post } from '../dto/response/posts';
import { PostCard } from './PostCard';

export function PostsList() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => postsService.getPosts(),
  });

  const createPost = useMutation({
    mutationFn: (data: CreatePostRequest) => postsService.createPost(data),
    onSuccess: () => {
      setTitle('');
      setBody('');
      setShowForm(false);
      
    },
    onError: (error) => {
      console.log('Error creating post:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      createPost.mutate({ title, body, userId: 1 });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Posts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Create Post'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Post content"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-24"
            />
          </div>
          <button
            type="submit"
            disabled={createPost.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {createPost.isPending ? 'Creating...' : 'Create'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {posts?.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 