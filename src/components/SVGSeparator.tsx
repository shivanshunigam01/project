import React from 'react';

interface SVGSeparatorProps {
  type?: 'wave' | 'slant' | 'curve';
  flip?: boolean;
  color?: string;
}

const SVGSeparator: React.FC<SVGSeparatorProps> = ({ 
  type = 'wave', 
  flip = false, 
  color = '#f9fafb' 
}) => {
  const getPath = () => {
    switch (type) {
      case 'wave':
        return "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";
      case 'slant':
        return "M0,0L1440,60L1440,0Z";
      case 'curve':
        return "M0,0C144,60,288,60,432,40C576,20,720,20,864,30C1008,40,1152,60,1296,60C1440,60,1440,60,1440,0Z";
      default:
        return "M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z";
    }
  };

  return (
    <div className={`relative ${flip ? 'transform rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 80"
        className="w-full h-12 md:h-16"
        preserveAspectRatio="none"
      >
        <path
          d={getPath()}
          fill={color}
        />
      </svg>
    </div>
  );
};

export default SVGSeparator;