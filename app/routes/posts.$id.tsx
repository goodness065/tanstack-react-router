
import { Link } from 'react-router';
import type { LoaderFunctionArgs } from "react-router";
import { postsService } from "../services/endpoints/posts";
import type { Route } from './+types/posts.$id';

// Loader function
export async function clientLoader({request, params}: LoaderFunctionArgs)  {
  const { id } = params;
  
  if (!id) {
    throw new Response("Post ID is required", { status: 400 });
  }

  try {
    const post = await postsService.getPost(parseInt(id));
    return { post };
  } catch (error) {
    throw new Response("Post not found", { status: 404 });
  }
}


export default function  SinglePost({loaderData}: Route.ComponentProps) {
  const { post } = loaderData;

  console.log(post);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link 
          to="/posts" 
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Posts
        </Link>
      </div>

      <div className="mb-6">  
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-gray-600">{post.body}</p>
      </div>
    </div>
  );
} 