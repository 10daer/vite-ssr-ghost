// src/pages/About.jsx
import React from "react";
import Card from "../components/common/Card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>

      <section className="mb-12">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Welcome to our platform! We are dedicated to bringing you
            high-quality content through a modern, server-side rendered
            application. Our journey began with a simple idea: create a
            seamless, fast, and accessible experience for readers while
            maintaining flexibility for content creators.
          </p>
          <p className="text-gray-600">
            Leveraging the power of Ghost CMS as a headless content management
            system, we've built a platform that offers the best of both worlds -
            easy content management with the performance benefits of server-side
            rendering.
          </p>
        </Card>
      </section>

      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Fast & Responsive</h3>
          <p className="text-gray-600">
            Our application is built with performance in mind, ensuring quick
            load times and a responsive experience across all devices.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">SEO Optimized</h3>
          <p className="text-gray-600">
            With server-side rendering, we ensure that content is easily
            discoverable by search engines, improving visibility and reach.
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-3">Modern Architecture</h3>
          <p className="text-gray-600">
            Built with Vite, React, and Helm, our application represents the
            cutting edge of web development practices and tools.
          </p>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Lead Developer",
              image: "https://i.pravatar.cc/300?img=1",
            },
            {
              name: "Sarah Williams",
              role: "UX Designer",
              image: "https://i.pravatar.cc/300?img=5",
            },
            {
              name: "Michael Chen",
              role: "Content Manager",
              image: "https://i.pravatar.cc/300?img=3",
            },
          ].map((member, index) => (
            <Card key={index} className="text-center p-6">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
        <Card className="p-6">
          <p className="text-gray-600 mb-6">
            Have questions or feedback? We'd love to hear from you!
          </p>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </Card>
      </section>
    </div>
  );
}

export const title = "About Us | My SSR App";
export const description = "Learn more about our team and our mission";
