"use client";
import { useEffect, useState } from 'react';

export default function GradientBackground() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show gradients on laptop and ultrawide screens (768px and above)
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 -z-10">
      {/* Single consistent gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000 40%, #0077ff 100%)",
          minHeight: "100vh",
          zIndex: 1
        }}
      />
    </div>
  );
}