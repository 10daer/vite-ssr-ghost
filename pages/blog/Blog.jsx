// src/pages/Blog.jsx
import React from "react";
import BlogCard from "../components/ui/BlogCard";
import { useGhostContent } from "../lib/ghost";

export default function Blog({ posts: initialPosts }) {
  const [page, setPage] = React.useState(1);
  const { data: clientPosts, loading } = useGhostContent("posts", {
    page,
    limit: 10,
    include: "authors,tags",
  });

  const posts = initialPosts || clientPosts || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {loading
          ? // Skeleton loading state
            Array(6)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 animate-pulse h-64 rounded-lg"
                ></div>
              ))
          : posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!posts || posts.length < 10}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export async function fetchData() {
  const { posts } = await fetchGhostData("posts", {
    page: 1,
    limit: 10,
    include: "authors,tags",
  });

  return { posts };
}

export const title = "Blog | My SSR App";
export const description = "Read our latest blog posts";
