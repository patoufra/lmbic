import React, { useState, useRef, useEffect } from 'react';

interface ColorSliderProps {
  value: { r: number; g: number; b: number };
  onChange: (value: { r: number; g: number; b: number }) => void;
}

export const ColorSlider: React.FC<ColorSliderProps> = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateColor(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateColor(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const updateColor = (e: React.MouseEvent | MouseEvent) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      
      // Convert percentage to RGB
      const rgb = percentageToRGB(percentage);
      onChange(rgb);
    }
  };

  const percentageToRGB = (percentage: number): { r: number; g: number; b: number } => {
    if (percentage <= 0.33) {
      return { r: 255, g: Math.round(percentage * 3 * 255), b: 0 };
    } else if (percentage <= 0.66) {
      return { r: Math.round((0.66 - percentage) * 3 * 255), g: 255, b: Math.round((percentage - 0.33) * 3 * 255) };
    } else {
      return { r: 0, g: Math.round((1 - percentage) * 3 * 255), b: 255 };
    }
  };

  const rgbToPercentage = (rgb: { r: number; g: number; b: number }): number => {
    const { r, g, b } = rgb;
    if (r === 255 && b === 0) return g / 255 * 0.33;
    if (g === 255 && r > 0) return 0.33 + (1 - r / 255) * 0.33;
    return 0.66 + b / 255 * 0.34;
  };

  const getBackgroundStyle = () => {
    return `linear-gradient(to right, rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0), rgb(0, 255, 255), rgb(0, 0, 255), rgb(255, 0, 255), rgb(255, 0, 0))`;
  };

  const percentage = rgbToPercentage(value);

  return (
    <div 
      ref={sliderRef}
      className="relative w-full h-8 cursor-pointer"
      onMouseDown={handleMouseDown}
    >
      <div 
        className="absolute w-full h-full rounded-full"
        style={{ background: getBackgroundStyle() }}
      />
      <div 
        className="absolute w-4 h-8 bg-white rounded-full shadow-md"
        style={{ left: `calc(${percentage * 100}% - 8px)` }}
      />
    </div>
  );
};

