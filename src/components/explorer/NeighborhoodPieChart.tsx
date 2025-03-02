
import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
  Text
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomTooltip from './CustomTooltip';

interface NeighborhoodPieChartProps {
  data: any[];
  tooltipContent: React.ReactNode;
}

const NeighborhoodPieChart: React.FC<NeighborhoodPieChartProps> = ({ data, tooltipContent }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return (
      <Text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </Text>
    );
  };

  // Process the data for the pie chart
  const pieData = data.reduce((acc, item) => {
    const neighborhood = item.Neighborhood;
    const existing = acc.find(entry => entry.name === neighborhood);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: neighborhood, value: 1 });
    }
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution of Neighborhoods</CardTitle>
        <CardDescription>A pie chart of the distribution of houses by neighborhood</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {
                pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip content={<CustomTooltip tooltipContent={tooltipContent} />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default NeighborhoodPieChart;
