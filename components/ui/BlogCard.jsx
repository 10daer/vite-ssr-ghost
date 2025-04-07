// src/components/ui/BlogCard.jsx
import React from "react";
import { formatDate } from "../../lib/utils";

export default function BlogCard({ post }) {
  if (!post) return null;

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {post.feature_image && (
        <a href={`/blog/${post.slug}`}>
          <div className="h-48 overflow-hidden">
            <img
              src={post.feature_image}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </a>
      )}

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          <a
            href={`/blog/${post.slug}`}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            {post.title}
          </a>
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {post.published_at && (
            <time dateTime={post.published_at}>
              {formatDate(post.published_at)}
            </time>
          )}
          {post.reading_time && (
            <span className="ml-3">{post.reading_time} min read</span>
          )}
        </p>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {post.primary_author && (
              <>
                {post.primary_author.profile_image ? (
                  <img
                    src={post.primary_author.profile_image}
                    alt={post.primary_author.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                )}
                <span className="text-sm text-gray-700">
                  {post.primary_author.name}
                </span>
              </>
            )}
          </div>

          <a
            href={`/blog/${post.slug}`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read more →
          </a>
        </div>
      </div>
    </article>
  );
}
