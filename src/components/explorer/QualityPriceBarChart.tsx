
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from './CustomTooltip';

interface QualityPriceBarChartProps {
  data: any[];
  tooltipContent: React.ReactNode;
}

const QualityPriceBarChart: React.FC<QualityPriceBarChartProps> = ({ data, tooltipContent }) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Overall Quality vs. Sale Price</CardTitle>
        <CardDescription>A bar chart of average sale price by overall quality</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="OverallQual" name="Overall Quality" />
            <YAxis 
              dataKey="SalePrice" 
              name="Average Sale Price ($)" 
              tickFormatter={(value) => value.toLocaleString()} 
            />
            <Tooltip content={<CustomTooltip tooltipContent={tooltipContent} />} />
            <Legend />
            <Bar dataKey="SalePrice" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default QualityPriceBarChart;
