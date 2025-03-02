
import { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts";
import { Search, TrendingUp, LucideHelpCircle, Home, ArrowDownUp } from "lucide-react";

// Time series forecast data
const forecastData = [];
const years = ["2010", "2011", "2012", "2013", "2014", "2015"];
const baselineValue = 200000;
const growthPerYear = 10000;

for (let i = 0; i < years.length; i++) {
  const year = years[i];
  const isProjected = i >= 2;
  forecastData.push({
    year,
    actual: isProjected ? null : Math.round(baselineValue + growthPerYear * i + Math.random() * 15000),
    projected: Math.round(baselineValue + growthPerYear * i + Math.random() * 5000),
    lowerBound: Math.round(baselineValue + growthPerYear * i - 20000 - Math.random() * 10000),
    upperBound: Math.round(baselineValue + growthPerYear * i + 20000 + Math.random() * 10000),
  });
}

// Home valuation data for feature-based estimates
const homeTypes = [
  { id: "colonial", name: "Colonial" },
  { id: "ranch", name: "Ranch" },
  { id: "tudor", name: "Tudor" },
  { id: "victorian", name: "Victorian" },
  { id: "contemporary", name: "Contemporary" },
];

const neighborhoods = [
  { id: "NridgHt", name: "Northridge Heights" },
  { id: "StoneBr", name: "Stone Brook" },
  { id: "NoRidge", name: "Northridge" },
  { id: "Timber", name: "Timberland" },
  { id: "Veenker", name: "Veenker" },
];

// Price elasticity data
const elasticityData = [
  { feature: "Overall Quality", value: 13.5, description: "% price change for each 1-point increase in quality" },
  { feature: "Ground Living Area", value: 0.052, description: "% price change for each additional square foot" },
  { feature: "Neighborhood Quality", value: 9.8, description: "% price difference between average and top neighborhoods" },
  { feature: "House Age", value: -0.24, description: "% price change for each additional year of age" },
  { feature: "Bathrooms", value: 5.6, description: "% price change for each additional bathroom" },
  { feature: "Garage Space", value: 3.7, description: "% price change for each additional car space" },
];

// Feature scenarios data
const scenarioData = [];
const baseSalePrice = 200000;
const renovations = ["None", "Kitchen", "Bathroom", "Basement", "Add Bedroom", "Full Remodel"];

renovations.forEach((renovation) => {
  let value;
  switch (renovation) {
    case "None":
      value = baseSalePrice;
      break;
    case "Kitchen":
      value = baseSalePrice * 1.045;
      break;
    case "Bathroom":
      value = baseSalePrice * 1.035;
      break;
    case "Basement":
      value = baseSalePrice * 1.08;
      break;
    case "Add Bedroom":
      value = baseSalePrice * 1.12;
      break;
    case "Full Remodel":
      value = baseSalePrice * 1.25;
      break;
    default:
      value = baseSalePrice;
  }
  
  scenarioData.push({
    name: renovation,
    value: Math.round(value),
    cost: renovation === "None" ? 0 : (
      renovation === "Kitchen" ? 30000 :
      renovation === "Bathroom" ? 15000 :
      renovation === "Basement" ? 40000 :
      renovation === "Add Bedroom" ? 60000 :
      renovation === "Full Remodel" ? 120000 : 0
    ),
    ROI: renovation === "None" ? 0 : (
      Math.round(((value - baseSalePrice) / (
        renovation === "Kitchen" ? 30000 :
        renovation === "Bathroom" ? 15000 :
        renovation === "Basement" ? 40000 :
        renovation === "Add Bedroom" ? 60000 :
        renovation === "Full Remodel" ? 120000 : 1
      )) * 100)
    )
  });
});

const Results = () => {
  const [overallQuality, setOverallQuality] = useState([7]);
  const [squareFeet, setSquareFeet] = useState(2000);
  const [neighborhood, setNeighborhood] = useState("NridgHt");
  const [homeType, setHomeType] = useState("colonial");
  const [bathrooms, setBathrooms] = useState([2]);
  const [garageSpaces, setGarageSpaces] = useState([2]);
  const [estimatedPrice, setEstimatedPrice] = useState("$285,000");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateEstimate = () => {
    // Simple formula based on the feature elasticity - this would be more complex in a real app
    const basePrice = 180000;
    const qualityFactor = 1 + (overallQuality[0] - 5) * 0.135;
    const sizeFactor = 1 + (squareFeet - 1500) * 0.00052;
    const neighborhoodFactor = neighborhood === "NridgHt" ? 1.098 : 
                              neighborhood === "StoneBr" ? 1.085 : 
                              neighborhood === "NoRidge" ? 1.075 : 
                              neighborhood === "Timber" ? 1.04 : 1.02;
    const bathroomFactor = 1 + (bathrooms[0] - 2) * 0.056;
    const garageFactor = 1 + (garageSpaces[0] - 1) * 0.037;
    
    const calculatedPrice = basePrice * qualityFactor * sizeFactor * neighborhoodFactor * bathroomFactor * garageFactor;
    setEstimatedPrice(`$${Math.round(calculatedPrice).toLocaleString()}`);
  };

  return (
    <Layout>
      <div className="container px-4 md:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Results & Applications</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground">
            Practical applications of our housing price prediction model
          </p>
        </motion.div>

        <Tabs defaultValue="predict" className="space-y-8">
          <TabsList className="flex justify-center">
            <TabsTrigger value="predict" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Home Valuation</span>
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Price Forecast</span>
            </TabsTrigger>
            <TabsTrigger value="elasticity" className="flex items-center gap-2">
              <ArrowDownUp className="h-4 w-4" />
              <span>Price Elasticity</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <LucideHelpCircle className="h-4 w-4" />
              <span>What-If Scenarios</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="predict" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Home Value Estimator</CardTitle>
                <CardDescription>
                  Estimate a home's value based on its characteristics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Overall Quality (1-10)</label>
                      <Slider
                        value={overallQuality}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={setOverallQuality}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Poor</span>
                        <span>Excellent</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Square Footage</label>
                      <Input
                        type="number"
                        value={squareFeet}
                        onChange={(e) => setSquareFeet(parseInt(e.target.value) || 0)}
                        min={500}
                        max={5000}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Neighborhood</label>
                      <Select value={neighborhood} onValueChange={setNeighborhood}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a neighborhood" />
                        </SelectTrigger>
                        <SelectContent>
                          {neighborhoods.map((n) => (
                            <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Home Type</label>
                      <Select value={homeType} onValueChange={setHomeType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a home type" />
                        </SelectTrigger>
                        <SelectContent>
                          {homeTypes.map((t) => (
                            <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Bathrooms</label>
                      <Slider
                        value={bathrooms}
                        min={1}
                        max={5}
                        step={0.5}
                        onValueChange={setBathrooms}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1</span>
                        <span>5</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Garage Spaces</label>
                      <Slider
                        value={garageSpaces}
                        min={0}
                        max={4}
                        step={1}
                        onValueChange={setGarageSpaces}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>None</span>
                        <span>4-Car</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={calculateEstimate} 
                        className="w-full h-12"
                        size="lg"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Calculate Estimate
                      </Button>
                    </div>

                    <div className="mt-6 p-6 border rounded-lg bg-accent/30 text-center">
                      <h4 className="text-sm font-medium">Estimated Home Value</h4>
                      <p className="text-3xl font-bold text-primary mt-2">
                        {estimatedPrice}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Based on comparable properties and model predictions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Price Forecast</CardTitle>
                <CardDescription>
                  Projected housing price trends over the next 3 years
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={forecastData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: 'var(--foreground)' }}
                      />
                      <YAxis 
                        tick={{ fill: 'var(--foreground)' }}
                        tickFormatter={tick => `$${(tick / 1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value: any) => value ? [`$${value.toLocaleString()}`, ''] : ['-', '']}
                        labelFormatter={(value) => `Year: ${value}`}
                      />
                      <Legend />
                      <defs>
                        <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="upperBound" 
                        stackId="1" 
                        stroke="none" 
                        fill="url(#colorProjection)" 
                        name="Prediction Range"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="lowerBound" 
                        stackId="2" 
                        stroke="none" 
                        fill="var(--background)" 
                        name="Prediction Range"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="var(--foreground)" 
                        strokeWidth={2} 
                        name="Actual Prices"
                        connectNulls
                      />
                      <Line 
                        type="monotone" 
                        dataKey="projected" 
                        stroke="var(--primary)" 
                        strokeWidth={2} 
                        strokeDasharray={[5, 5]} 
                        name="Projected Prices"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 p-6 border rounded-lg bg-accent/20">
                  <h4 className="font-medium mb-2">Forecast Interpretation</h4>
                  <p className="text-sm text-muted-foreground">
                    Our model projects a steady increase in housing prices over the next three years, with an average 
                    annual growth rate of 4.8%. This forecast is based on historical trends, current economic indicators, 
                    and regional development plans. The shaded area represents the prediction confidence interval, 
                    accounting for market volatility and other uncertain factors.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="elasticity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Price Elasticity</CardTitle>
                <CardDescription>
                  How much each feature affects the final sale price
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {elasticityData.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{item.feature}</h4>
                        <span className="text-primary font-bold text-lg">
                          {item.value > 0 ? "+" : ""}{item.value}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="mt-3 h-2 bg-secondary rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ 
                            width: `${(Math.abs(item.value) / 15) * 100}%`,
                            opacity: item.value > 0 ? 1 : 0.7
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scenarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What-If Renovation Scenarios</CardTitle>
                <CardDescription>
                  Estimated home value impact of different renovation projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {scenarioData.map((scenario, index) => (
                    <div key={index} className={`p-4 border ${index === 0 ? 'border-dashed' : ''} rounded-lg ${index === 5 ? 'bg-primary/5' : ''}`}>
                      <h4 className="font-medium">{scenario.name}</h4>
                      <p className="text-2xl font-bold mt-2">${scenario.value.toLocaleString()}</p>
                      
                      {index > 0 && (
                        <>
                          <div className="flex justify-between items-center mt-3 text-sm">
                            <span className="text-muted-foreground">Cost:</span>
                            <span>${scenario.cost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center mt-1 text-sm">
                            <span className="text-muted-foreground">Value Added:</span>
                            <span className="text-primary">+${(scenario.value - scenarioData[0].value).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center mt-1 text-sm">
                            <span className="text-muted-foreground">ROI:</span>
                            <span className={scenario.ROI > 70 ? 'text-green-500 font-medium' : 'text-orange-500'}>
                              {scenario.ROI}%
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="p-6 border rounded-lg bg-accent/20">
                  <h4 className="font-medium mb-2">Investment Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on our model predictions, smaller targeted renovations like kitchen and bathroom upgrades 
                    typically provide a better return on investment compared to major structural changes. However, 
                    in high-end neighborhoods, adding living space can significantly increase property values beyond 
                    construction costs. The ROI percentages represent the estimated return based on immediate property 
                    value increase versus renovation costs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Results;
