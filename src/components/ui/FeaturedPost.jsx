// src/components/ui/FeaturedPost.jsx
import React from "react";

export default function FeaturedPost({ post }) {
  if (!post) return null;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      {post.feature_image && (
        <a href={`/blog/${post.slug}`}>
          <div className="h-40 overflow-hidden">
            <img
              src={post.feature_image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </a>
      )}

      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">
          <a
            href={`/blog/${post.slug}`}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            {post.title}
          </a>
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-auto">
          <a
            href={`/blog/${post.slug}`}
            className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
          >
            Read Article
          </a>
        </div>
      </div>
    </article>
  );
}
