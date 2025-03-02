
import { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend, Sector } from "recharts";
import { Badge } from "@/components/ui/badge";
import { CircleHelp, AlertCircle, BarChart3, PieChart as PieChartIcon, FileText } from "lucide-react";

// Feature importance data
const featureImportanceData = [
  { name: "Overall Quality", value: 0.387, description: "Overall material and finish quality" },
  { name: "Ground Living Area", value: 0.164, description: "Above ground living area in square feet" },
  { name: "Neighborhood_NridgHt", value: 0.057, description: "Northridge Heights neighborhood" },
  { name: "Total Basement SF", value: 0.051, description: "Total basement area in square feet" },
  { name: "Exterior Quality", value: 0.043, description: "Quality of exterior material" },
  { name: "Kitchen Quality", value: 0.033, description: "Kitchen quality rating" },
  { name: "Garage Cars", value: 0.029, description: "Size of garage in car capacity" },
  { name: "Year Built", value: 0.026, description: "Original construction year" },
  { name: "Basement Quality", value: 0.022, description: "Quality of basement" },
  { name: "Fireplaces", value: 0.017, description: "Number of fireplaces" },
].sort((a, b) => b.value - a.value);

// SHAP values for an example prediction
const examplePrediction = {
  actualPrice: 234500,
  predictedPrice: 241200,
  baseValue: 180000,
  features: [
    { name: "Overall Quality", value: 8, contribution: 42000, direction: "positive" },
    { name: "Ground Living Area", value: "2,100 sq.ft", contribution: 18500, direction: "positive" },
    { name: "Neighborhood", value: "NridgHt", contribution: 12000, direction: "positive" },
    { name: "Year Built", value: 2007, contribution: 8500, direction: "positive" },
    { name: "Total Basement SF", value: "1,050 sq.ft", contribution: 4200, direction: "positive" },
    { name: "Exterior Quality", value: "Excellent", contribution: 3800, direction: "positive" },
    { name: "Kitchen Quality", value: "Good", contribution: -2100, direction: "negative" },
    { name: "Lot Size", value: "9,500 sq.ft", contribution: -3700, direction: "negative" },
  ],
};

// Model metrics
const modelMetrics = [
  { name: "R² Score", value: 0.92, description: "Percentage of variance in the target variable explained by the model" },
  { name: "RMSE", value: "$21,935", description: "Average error in dollars between predicted and actual prices" },
  { name: "MAE", value: "$15,260", description: "Average absolute error in dollars" },
  { name: "MAPE", value: "7.2%", description: "Average percentage error" },
];

// Category importance data for pie chart
const categoryImportanceData = [
  { name: "Quality Ratings", value: 48, fill: "#3b82f6" },
  { name: "Size Metrics", value: 27, fill: "#64748b" },
  { name: "Location", value: 12, fill: "#6366f1" },
  { name: "Age/Condition", value: 8, fill: "#a855f7" },
  { name: "Amenities", value: 5, fill: "#ec4899" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-lg shadow-lg">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-primary font-medium text-sm">Importance: {(payload[0].value * 100).toFixed(1)}%</p>
        <p className="text-muted-foreground text-xs mt-1">{payload[0].payload.description}</p>
      </div>
    );
  }
  return null;
};

// Active shape for pie chart
const renderActiveShape = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-midAngle * Math.PI / 180);
  const cos = Math.cos(-midAngle * Math.PI / 180);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="var(--foreground)" fontSize={12}>{`${payload.name}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="var(--foreground)" fontSize={12} fontWeight="bold">
        {`${value}%`}
      </text>
    </g>
  );
};

const Model = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shapBaseValue, setShapBaseValue] = useState(examplePrediction.baseValue);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Model Insights</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            Understanding what drives our housing price predictions
          </p>
        </motion.div>

        <Tabs defaultValue="importance" className="space-y-8">
          <TabsList className="flex justify-center">
            <TabsTrigger value="importance" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Feature Importance</span>
            </TabsTrigger>
            <TabsTrigger value="shap" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>SHAP Values</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Category Impact</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Model Metrics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="importance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
                <CardDescription>
                  The relative importance of each feature in the XGBoost model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={featureImportanceData}
                      margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
                      layout="vertical"
                    >
                      <XAxis 
                        type="number" 
                        tick={{ fill: 'var(--foreground)' }}
                        tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fill: 'var(--foreground)' }} 
                        width={150}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="value" fill="var(--primary)">
                        {featureImportanceData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={index < 3 ? 'var(--primary)' : 'var(--muted-foreground)'}
                            opacity={1 - (index * 0.07)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SHAP Value Explanation for an Example Prediction</CardTitle>
                <CardDescription>
                  How each feature contributes to this specific price prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Actual Price:</span>
                      <span className="font-bold text-lg">${examplePrediction.actualPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Predicted Price:</span>
                      <span className="font-bold text-lg text-primary">${examplePrediction.predictedPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Base Value:</span>
                      <span className="font-medium">${shapBaseValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Error:</span>
                      <Badge variant={Math.abs(examplePrediction.predictedPrice - examplePrediction.actualPrice) < 10000 ? "outline" : "destructive"}>
                        ${Math.abs(examplePrediction.predictedPrice - examplePrediction.actualPrice).toLocaleString()} ({((Math.abs(examplePrediction.predictedPrice - examplePrediction.actualPrice) / examplePrediction.actualPrice) * 100).toFixed(1)}%)
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CircleHelp className="h-4 w-4" />
                      <p>SHAP values show how each feature pushes the prediction higher or lower from the base value</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="relative h-12 bg-secondary rounded-lg overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary"
                      style={{ 
                        width: `${((shapBaseValue - examplePrediction.baseValue) / (examplePrediction.predictedPrice - examplePrediction.baseValue)) * 100}%`,
                        opacity: 0.2
                      }}
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-4">
                      <span className="text-sm font-medium">Base Value: ${shapBaseValue.toLocaleString()}</span>
                    </div>
                    <div className="absolute top-0 right-0 h-full flex items-center pr-4">
                      <span className="text-sm font-medium">Prediction: ${examplePrediction.predictedPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  {examplePrediction.features.map((feature, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3">
                        <span className="text-sm font-medium">{feature.name}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-sm text-muted-foreground">{feature.value}</span>
                      </div>
                      <div className="col-span-5 relative h-8">
                        <div 
                          className={`absolute top-0 h-full rounded ${
                            feature.direction === "positive" 
                              ? "right-0 bg-primary" 
                              : "left-0 bg-destructive/70"
                          }`}
                          style={{ 
                            width: `${(Math.abs(feature.contribution) / examplePrediction.predictedPrice) * 300}%`,
                          }}
                        />
                      </div>
                      <div className="col-span-2 text-right">
                        <span className={`text-sm font-medium ${
                          feature.direction === "positive" 
                            ? "text-primary" 
                            : "text-destructive"
                        }`}>
                          {feature.direction === "positive" ? "+" : "-"}${Math.abs(feature.contribution).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Category Impact</CardTitle>
                <CardDescription>
                  How different types of features contribute to predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={categoryImportanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                      >
                        {categoryImportanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="bottom" 
                        height={36}
                        formatter={(value, entry, index) => (
                          <span className="text-sm" style={{ color: "var(--foreground)" }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Metrics</CardTitle>
                <CardDescription>
                  How well our XGBoost model performs on the test dataset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {modelMetrics.map((metric, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <h3 className="text-lg font-medium text-foreground">{metric.name}</h3>
                      <p className="text-3xl font-bold text-primary mt-2">{metric.value}</p>
                      <p className="text-sm text-muted-foreground mt-2">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Model;
