
import { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, ScatterChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter, ZAxis, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DataBar, DollarSign, SquareStack, ArrowUpDown } from "lucide-react";

// Mock data for the visualizations
const correlationData = [
  { feature: "Overall Quality", correlation: 0.79 },
  { feature: "Ground Living Area", correlation: 0.71 },
  { feature: "Garage Cars", correlation: 0.64 },
  { feature: "Total Basement SF", correlation: 0.61 },
  { feature: "1st Floor SF", correlation: 0.61 },
  { feature: "Full Bath", correlation: 0.56 },
  { feature: "Year Built", correlation: 0.53 },
  { feature: "Year Remodeled", correlation: 0.51 },
  { feature: "Garage Area", correlation: 0.48 },
  { feature: "TotRms AbvGrd", correlation: 0.47 },
].sort((a, b) => b.correlation - a.correlation);

const scatterData = [
  { x: 1500, y: 175000, z: 7 },
  { x: 2500, y: 225000, z: 8 },
  { x: 1800, y: 195000, z: 7 },
  { x: 3000, y: 320000, z: 9 },
  { x: 2200, y: 250000, z: 8 },
  { x: 1600, y: 145000, z: 6 },
  { x: 2800, y: 310000, z: 9 },
  { x: 2000, y: 220000, z: 8 },
  { x: 3200, y: 345000, z: 10 },
  { x: 1700, y: 170000, z: 7 },
  { x: 2300, y: 260000, z: 8 },
  { x: 1900, y: 205000, z: 7 },
  { x: 2700, y: 295000, z: 9 },
  { x: 2100, y: 240000, z: 8 },
  { x: 3400, y: 360000, z: 10 },
  { x: 1800, y: 185000, z: 7 },
  { x: 2600, y: 280000, z: 9 },
  { x: 2000, y: 210000, z: 8 },
  { x: 3100, y: 340000, z: 10 },
  { x: 2400, y: 265000, z: 8 },
  { x: 1700, y: 160000, z: 6 },
  { x: 2900, y: 315000, z: 9 },
  { x: 2200, y: 245000, z: 8 },
  { x: 3300, y: 355000, z: 10 },
  { x: 1900, y: 200000, z: 7 },
  { x: 2500, y: 275000, z: 9 },
  { x: 2100, y: 235000, z: 8 },
  { x: 3000, y: 325000, z: 9 },
  { x: 2300, y: 255000, z: 8 },
  { x: 1600, y: 150000, z: 6 },
];

const neighborhoodData = [
  { name: "NridgHt", value: 315000 },
  { name: "StoneBr", value: 302000 },
  { name: "NoRidge", value: 290000 },
  { name: "Timber", value: 242000 },
  { name: "Veenker", value: 238000 },
  { name: "Somerst", value: 225000 },
  { name: "ClearCr", value: 212000 },
  { name: "Crawfor", value: 210000 },
  { name: "CollgCr", value: 198000 },
  { name: "Blmngtn", value: 195000 },
];

const timeSeriesData = [];
for (let year = 2006; year <= 2010; year++) {
  for (let month = 1; month <= 12; month++) {
    const baseValue = 200000;
    const trend = (year - 2006) * 5000;
    const seasonality = Math.sin((month - 1) / 11 * Math.PI * 2) * 10000;
    const random = Math.random() * 20000 - 10000;
    
    timeSeriesData.push({
      date: `${year}-${month.toString().padStart(2, '0')}`,
      price: Math.max(150000, baseValue + trend + seasonality + random),
    });
  }
}

// Custom tooltip component for scatter plot
const CustomScatterTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-sm">Ground Living Area: {payload[0].value} sq.ft</p>
        <p className="text-primary font-medium text-sm">Sale Price: ${payload[1].value.toLocaleString()}</p>
        <p className="text-muted-foreground text-xs">Overall Quality: {payload[2].value}/10</p>
      </div>
    );
  }
  return null;
};

const Explorer = () => {
  const [selectedFeature, setSelectedFeature] = useState("Ground Living Area");
  const [qualityFilter, setQualityFilter] = useState([1, 10]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredScatterData = scatterData.filter(
    item => item.z >= qualityFilter[0] && item.z <= qualityFilter[1]
  );

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Data Explorer</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            Interactively explore the Ames Housing Dataset and its relationships
          </p>
        </motion.div>

        <Tabs defaultValue="correlation" className="space-y-8">
          <TabsList className="flex justify-center">
            <TabsTrigger value="correlation" className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4" />
              <span>Correlations</span>
            </TabsTrigger>
            <TabsTrigger value="scatter" className="flex items-center gap-2">
              <DataBar className="h-4 w-4" />
              <span>Relationships</span>
            </TabsTrigger>
            <TabsTrigger value="neighborhood" className="flex items-center gap-2">
              <SquareStack className="h-4 w-4" />
              <span>Neighborhoods</span>
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Price Trends</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="correlation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Correlation with Sale Price</CardTitle>
                <CardDescription>
                  The strongest predictors of housing prices in the dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={correlationData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis 
                        type="number" 
                        domain={[0, 0.85]} 
                        tickCount={7}
                        tick={{ fill: 'var(--foreground)' }}
                      />
                      <YAxis 
                        dataKey="feature" 
                        type="category" 
                        tick={{ fill: 'var(--foreground)' }}
                        width={140}
                      />
                      <Tooltip 
                        formatter={(value: number) => [value.toFixed(2), 'Correlation']}
                      />
                      <Bar dataKey="correlation" fill="var(--primary)">
                        {correlationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index < 3 ? 'var(--primary)' : 'var(--primary-foreground)'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scatter" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sale Price vs. Ground Living Area</CardTitle>
                <CardDescription>
                  Relationship between home size and price, colored by overall quality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="md:col-span-3">
                    <Select value={selectedFeature} onValueChange={setSelectedFeature}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a feature" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ground Living Area">Ground Living Area</SelectItem>
                        <SelectItem value="Total Basement SF">Total Basement SF</SelectItem>
                        <SelectItem value="Garage Area">Garage Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium mb-2">Quality Filter: {qualityFilter[0]}-{qualityFilter[1]}</span>
                    <Slider
                      value={qualityFilter}
                      min={1}
                      max={10}
                      step={1}
                      onValueChange={setQualityFilter}
                    />
                  </div>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="Area" 
                        unit=" sq.ft" 
                        tick={{ fill: 'var(--foreground)' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="Price" 
                        unit=" USD" 
                        tick={{ fill: 'var(--foreground)' }}
                        tickFormatter={tick => `$${(tick / 1000).toFixed(0)}k`}
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="z" 
                        range={[50, 400]} 
                        name="Quality" 
                      />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomScatterTooltip />} />
                      <Scatter 
                        name="Properties" 
                        data={filteredScatterData} 
                        fill="var(--primary)" 
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="neighborhood" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Sale Price by Neighborhood</CardTitle>
                <CardDescription>
                  How location affects housing prices in Ames, Iowa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={neighborhoodData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'var(--foreground)' }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        tick={{ fill: 'var(--foreground)' }}
                        tickFormatter={tick => `$${(tick / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Average Price']}
                      />
                      <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="time" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Housing Price Trends Over Time</CardTitle>
                <CardDescription>
                  Monthly average sale prices from 2006 to 2010
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={timeSeriesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fill: 'var(--foreground)' }}
                        interval={5}
                      />
                      <YAxis 
                        tick={{ fill: 'var(--foreground)' }}
                        tickFormatter={tick => `$${(tick / 1000).toFixed(0)}k`}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Average Price']}
                        labelFormatter={(label) => {
                          const date = new Date(label);
                          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="var(--primary)" 
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Explorer;
