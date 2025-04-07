// src/pages/Post.jsx
import React from "react";
import { fetchGhostData } from "../lib/ghost";
import { formatDate } from "../lib/utils";

export default function Post({ post }) {
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <p className="mb-8">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <a
          href="/blog"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Back to Blog
        </a>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8">
      {post.feature_image && (
        <div className="w-full h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
          <img
            src={post.feature_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        {post.title}
      </h1>

      <div className="flex items-center text-gray-600 mb-8">
        {post.primary_author && (
          <div className="flex items-center mr-6">
            {post.primary_author.profile_image ? (
              <img
                src={post.primary_author.profile_image}
                alt={post.primary_author.name}
                className="w-10 h-10 rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
            )}
            <span>{post.primary_author.name}</span>
          </div>
        )}

        <time dateTime={post.published_at}>
          {formatDate(post.published_at)}
        </time>

        {post.reading_time && (
          <span className="ml-6">{post.reading_time} min read</span>
        )}
      </div>

      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium mb-4">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <a
                key={tag.id}
                href={`/tag/${tag.slug}`}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition-colors"
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export async function fetchData({ slug }) {
  const { posts } = await fetchGhostData("posts", {
    slug,
    include: "authors,tags",
  });

  return { post: posts?.[0] || null };
}

export function onBeforeRender({ routeParams }) {
  // This function is used to determine metadata before render
  return fetchData(routeParams);
}
