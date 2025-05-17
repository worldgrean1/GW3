import React from 'react';

const AnotherHeavyComponent = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-4">Viewport-Loaded Component</h3>
      <p className="text-gray-700 mb-3">
        This component only loads when it scrolls into view.
        This technique is useful for components that are lower on the page
        and don't need to be loaded during initial page render.
      </p>
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="p-4 bg-green-100 rounded-md">
            <h4 className="font-medium text-green-800 mb-2">Section {i + 1}</h4>
            <p className="text-green-700">
              This content is part of a component that was loaded lazily when it entered the viewport.
              In a real application, this could be a complex widget, chart, or data visualization.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnotherHeavyComponent; 