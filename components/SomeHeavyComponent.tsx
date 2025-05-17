import React from 'react';

const SomeHeavyComponent = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold mb-4">Heavy Component</h3>
      <p className="text-gray-700 mb-3">
        This component is imported dynamically to improve page load time.
        In a real application, this would be a complex component with many
        dependencies that aren't needed immediately.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="h-24 bg-blue-100 rounded-md flex items-center justify-center">
            <span className="text-blue-800 font-medium">Item {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomeHeavyComponent; 