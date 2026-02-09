import React from 'react';

const InfoIcon = ({ width = 16, height = 16, color = "#6B7280" }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M12 16V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default InfoIcon;
