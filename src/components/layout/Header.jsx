// src/components/layout/Header.jsx
import React, { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">MySite</a>
          
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <a href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          </nav>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// src/components/layout/Footer.jsx
import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="text-xl font-bold text-blue-600">MySite</a>
            <p className="mt-2 text-gray-600">
              A modern SSR application built with Vite and React
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a></li>
                <li><a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
                           <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">GitHub</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>© {year} MySite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}