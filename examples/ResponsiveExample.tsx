import React from 'react';
import { useBreakpoint, useMediaQuery, useResponsiveValue, ResponsiveValue } from '../utils/responsive';

// Example of a component with responsive props
interface CardProps {
  title: string;
  description: string;
  responsive: ResponsiveValue<{
    columns: 1 | 2 | 3 | 4;
    showImage: boolean;
  }>;
}

const Card: React.FC<CardProps> = ({ title, description, responsive }) => {
  // Get responsive values based on current breakpoint
  const { columns, showImage } = useResponsiveValue(responsive);
  
  return (
    <div className={`w-full md:w-1/${columns} p-4`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {showImage && (
          <div className="h-48 bg-gray-200">
            <img 
              src="/images/example.jpg" 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function ResponsiveExample() {
  // Get current breakpoint
  const breakpoint = useBreakpoint();
  
  // Check if screen is above medium breakpoint
  const isAboveMd = useMediaQuery('md');
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Responsive Components Example</h2>
      
      <div className="p-4 bg-blue-100 rounded mb-6">
        <p>Current breakpoint: <strong>{breakpoint}</strong></p>
        <p>Is above medium breakpoint: <strong>{isAboveMd ? 'Yes' : 'No'}</strong></p>
      </div>
      
      <div className="flex flex-wrap -mx-4">
        <Card
          title="Responsive Card 1"
          description="This card adapts its layout based on screen size"
          responsive={{
            base: { columns: 1, showImage: false },
            sm: { columns: 2, showImage: false },
            md: { columns: 3, showImage: true },
            lg: { columns: 4, showImage: true },
          }}
        />
        
        <Card
          title="Responsive Card 2"
          description="Another example of responsive behavior"
          responsive={{
            base: { columns: 1, showImage: true },
            sm: { columns: 2, showImage: true },
            md: { columns: 3, showImage: true },
            lg: { columns: 4, showImage: true },
          }}
        />
        
        <Card
          title="Responsive Card 3"
          description="A third example with different responsive settings"
          responsive={{
            base: { columns: 1, showImage: false },
            md: { columns: 2, showImage: true },
            xl: { columns: 3, showImage: true },
          }}
        />
      </div>
    </div>
  );
} 