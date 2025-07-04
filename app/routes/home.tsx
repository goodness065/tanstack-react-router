import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - TanStack Query Demo" },
    { name: "description", content: "Welcome to TanStack Query Demo!" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
     <h1>Home</h1>
    </div>
  );
}
