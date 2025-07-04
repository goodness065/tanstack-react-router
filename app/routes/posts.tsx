import type { Route } from "./+types/posts";
import { PostsList } from "../components/PostsList";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Posts - TanStack Query Demo" },
    { name: "description", content: "Manage posts with TanStack Query" },
  ];
}

export default function Posts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PostsList />
    </div>
  );
} 