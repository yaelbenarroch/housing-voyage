import React, { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const Results = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [overallQual, setOverallQual] = useState<number>(5);
  const [grLivArea, setGrLivArea] = useState<number>(1200);
  const [garageArea, setGarageArea] = useState<number>(500);
  const [neighborhood, setNeighborhood] = useState<string>("NAmes");
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const neighborhoods = [
    "NAmes",
    "CollgCr",
    "OldTown",
    "Edwards",
    "Somerst",
    "Gilbert",
    "NWAmes",
    "Sawyer",
    "Mitchel",
    "BrkSide",
    "Crawfor",
    "IDOTRR",
    "Timber",
    "SawyerW",
    "StoneBr",
    "SWISU",
    "MeadowV",
    "ClearCr",
    "NPkVill",
    "Blmngtn",
    "BrDale",
    "Veenker",
    "NridgHt",
    "NoRidge",
  ];

  const data = [
    { name: "Jan", value: 2400 },
    { name: "Feb", value: 1398 },
    { name: "Mar", value: 9800 },
    { name: "Apr", value: 3908 },
    { name: "May", value: 4800 },
    { name: "Jun", value: 3800 },
    { name: "Jul", value: 4300 },
    { name: "Aug", value: 2400 },
    { name: "Sep", value: 1398 },
    { name: "Oct", value: 9800 },
    { name: "Nov", value: 3908 },
    { name: "Dec", value: 4800 },
  ];

  const data2 = [
    { name: "Category A", value: 2400, value2: 0 },
    { name: "Category B", value: 1398, value2: 200 },
    { name: "Category C", value: 9800, value2: 400 },
    { name: "Category D", value: 3908, value2: 600 },
    { name: "Category E", value: 4800, value2: 800 },
    { name: "Category F", value: 3800, value2: 1000 },
    { name: "Category G", value: 4300, value2: 1200 },
  ];

  const data3 = [
    { name: "Category A", value: [2400, 3000] },
    { name: "Category B", value: [1398, 2000] },
    { name: "Category C", value: [9800, 5000] },
    { name: "Category D", value: [3908, 4000] },
    { name: "Category E", value: [4800, 6000] },
    { name: "Category F", value: [3800, 1000] },
    { name: "Category G", value: [4300, 7000] },
  ];

  const handlePredictPrice = async () => {
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OverallQual: overallQual,
          GrLivArea: grLivArea,
          GarageArea: garageArea,
          Neighborhood: neighborhood,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPredictedPrice(data.predictedPrice);
      } else {
        console.error("Failed to predict price");
        setPredictedPrice(null);
      }
    } catch (error) {
      console.error("Error:", error);
      setPredictedPrice(null);
    }
  };

  const handleCopyToClipboard = () => {
    const predictionText = `Predicted Price: $${predictedPrice?.toFixed(2)}`;
    navigator.clipboard.writeText(predictionText);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Layout>
      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Predicted Housing Price
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground">
              Adjust the following parameters to predict the housing price.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-6 mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Prediction Parameters</CardTitle>
                <CardDescription>
                  Adjust the parameters to see the predicted price.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="overallQual">Overall Quality (1-10)</Label>
                  <Slider
                    id="overallQual"
                    defaultValue={[overallQual]}
                    max={10}
                    min={1}
                    step={1}
                    onValueChange={(value) => setOverallQual(value[0])}
                  />
                  <Input
                    type="number"
                    value={overallQual}
                    onChange={(e) =>
                      setOverallQual(parseInt(e.target.value, 10))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grLivArea">
                    Above Ground Living Area (sq ft)
                  </Label>
                  <Input
                    type="number"
                    id="grLivArea"
                    value={grLivArea}
                    onChange={(e) =>
                      setGrLivArea(parseInt(e.target.value, 10))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="garageArea">Garage Area (sq ft)</Label>
                  <Input
                    type="number"
                    id="garageArea"
                    value={garageArea}
                    onChange={(e) =>
                      setGarageArea(parseInt(e.target.value, 10))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="neighborhood">Neighborhood</Label>
                  <select
                    id="neighborhood"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                  >
                    {neighborhoods.map((neighborhood) => (
                      <option key={neighborhood} value={neighborhood}>
                        {neighborhood}
                      </option>
                    ))}
                  </select>
                </div>
                <Button onClick={handlePredictPrice}>Predict Price</Button>
              </CardContent>
            </Card>

            {predictedPrice !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>Predicted Price</CardTitle>
                  <CardDescription>
                    The predicted price based on the parameters you entered.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-2xl font-bold">
                    ${predictedPrice.toFixed(2)}
                  </div>
                  <Button onClick={handleCopyToClipboard} disabled={isCopied}>
                    {isCopied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-secondary/10">
        <div className="container px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Visualized Data
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground">
              Explore the data through various visualizations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-6 mt-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Area Chart</CardTitle>
                <CardDescription>
                  An area chart showing trends over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Line Chart with Two Lines</CardTitle>
                <CardDescription>
                  A line chart comparing two categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data2}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Line Chart with Range</CardTitle>
                <CardDescription>
                  A line chart showing a range of values.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data3}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Fix: Ensure dataKey is a string, number, or a function that returns one */}
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Sample Data Table
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground">
              A sample data table showcasing the dataset.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 overflow-x-auto"
          >
            <Table>
              <TableCaption>A sample of the housing dataset.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">OverallQual</TableCell>
                  <TableCell>{overallQual}</TableCell>
                  <TableCell>Overall quality of the house</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">GrLivArea</TableCell>
                  <TableCell>{grLivArea}</TableCell>
                  <TableCell>Above ground living area in square feet</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">GarageArea</TableCell>
                  <TableCell>{garageArea}</TableCell>
                  <TableCell>Size of garage in square feet</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Neighborhood</TableCell>
                  <TableCell>{neighborhood}</TableCell>
                  <TableCell>Location of the house</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Results;
