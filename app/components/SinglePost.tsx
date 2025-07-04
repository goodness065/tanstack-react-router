import { useState } from 'react';
import { useLoaderData, Form, useNavigation, Link, redirect } from 'react-router';
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { postsService } from "../services/endpoints/posts";
import type { UpdatePostRequest } from "../dto/request/posts";
import type { Post } from '../dto/response/posts';

interface LoaderData {
  post: Post;
}

// Loader function
export async function loader({ params }: LoaderFunctionArgs) {
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

// Action function
export async function action({ request, params }: ActionFunctionArgs) {
  const { id } = params;
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (!id) {
    throw new Response("Post ID is required", { status: 400 });
  }

  try {
    switch (intent) {
      case "update": {
        const title = formData.get("title") as string;
        const body = formData.get("body") as string;
        
        if (!title || !body) {
          return new Response(JSON.stringify({ error: "Title and body are required" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }

        const updateData: UpdatePostRequest = { title, body };
        const post = await postsService.updatePost(parseInt(id), updateData);
        return new Response(JSON.stringify({ success: true, post }), {
          headers: { "Content-Type": "application/json" }
        });
      }

      case "delete": {
        await postsService.deletePost(parseInt(id));
        return redirect("/posts");
      }

      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Action failed" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export function SinglePost() {
  const [isEditing, setIsEditing] = useState(false);
  const { post } = useLoaderData<LoaderData>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {isEditing ? (
          <Form method="post" onSubmit={() => setIsEditing(false)}>
            <input type="hidden" name="intent" value="update" />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={post.title}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="body"
                defaultValue={post.body}
                className="w-full p-2 border border-gray-300 rounded h-32"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </Form>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{post.title}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <Form method="post">
                  <input type="hidden" name="intent" value="delete" />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                    onClick={(e) => {
                      if (!confirm('Are you sure you want to delete this post?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                  </button>
                </Form>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.body}</p>
            
            <div className="text-sm text-gray-500 border-t pt-4">
              <p>Post ID: {post.id}</p>
              <p>User ID: {post.userId}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 