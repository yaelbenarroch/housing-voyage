
import React from 'react';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  tooltipContent?: React.ReactNode;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, tooltipContent }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#f9f9f9', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`Neighborhood: ${data.Neighborhood}`}</p>
        <p className="label">{`SalePrice: $${data.SalePrice}`}</p>
        <p className="label">{`GrLivArea: ${data.GrLivArea} sq ft`}</p>
        {tooltipContent}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
