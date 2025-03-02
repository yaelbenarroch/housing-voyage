
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from './CustomTooltip';

interface PriceVsAreaChartProps {
  data: any[];
  tooltipContent: React.ReactNode;
  handleMouseEnter: (entry: any) => void;
}

const PriceVsAreaChart: React.FC<PriceVsAreaChartProps> = ({ 
  data, 
  tooltipContent, 
  handleMouseEnter 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sale Price vs. Living Area</CardTitle>
        <CardDescription>A scatter plot of sale price vs. living area</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="GrLivArea" name="Living Area (sq ft)" />
            <YAxis dataKey="SalePrice" name="Sale Price ($)" tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip content={<CustomTooltip tooltipContent={tooltipContent} />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="SalePrice" 
              stroke="#8884d8" 
              activeDot={{ r: 8 }} 
              onMouseEnter={handleMouseEnter} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PriceVsAreaChart;
