// src/pages/Home.jsx
import React from "react";
import Card from "../components/common/Card";
import FeaturedPost from "../components/ui/FeaturedPost";
import { useGhostContent } from "../lib/ghost";

export default function Home({ featuredPosts }) {
  // For client-side navigation, we'll fetch data on the client as well
  // Server already provides initial data through props
  const { data: posts, loading } = useGhostContent("posts", {
    limit: 3,
    include: "authors,tags",
    filter: "featured:true",
  });

  const displayPosts = featuredPosts || posts || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Our Site
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Discover the latest content from our blog, curated just for you. We
          bring insights, news and updates on topics that matter to you.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Featured Posts
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-200 animate-pulse h-64 rounded-lg"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.map((post) => (
              <FeaturedPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">About Us</h2>
        <Card>
          <div className="p-6">
            <p className="text-gray-600">
              We're dedicated to bringing you the best content on topics that
              matter. Our team of writers and editors work hard to ensure
              quality and relevance.
            </p>
            <a
              href="/about"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}

// For server-side data fetching
export async function fetchData() {
  const { posts } = await fetchGhostData("posts", {
    limit: 3,
    include: "authors,tags",
    filter: "featured:true",
  });

  return { featuredPosts: posts };
}

export const title = "Home | My SSR App";
export const description =
  "Welcome to our server-side rendered application with Ghost CMS";
