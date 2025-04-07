// src/components/common/Card.jsx
import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
