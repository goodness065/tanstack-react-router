import { Link } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { postsService } from '../services/endpoints/posts';
import type { Post } from '../dto/response/posts';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const deletePost = useMutation({
    mutationFn: () => postsService.deletePost(post.id),
  });

  const handleDelete = () => {
      deletePost.mutate();

  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Link 
            to={`/posts/${post.id}`} 
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2 block"
          >
            {post.title}
          </Link>
          <p className="text-gray-600 mb-2">{post.body}</p>
          <p className="text-sm text-gray-500">Post ID: {post.id} | User ID: {post.userId}</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deletePost.isPending}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deletePost.isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
} 