
// Replace DataBar with BarChart3 or another suitable icon
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    Sector,
    Text
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Layout from "@/components/common/Layout";

interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const Explorer = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 755000]);
    const [sqFtRange, setSqFtRange] = useState([0, 5642]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [tooltipContent, setTooltipContent] = useState<React.ReactNode>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://raw.githubusercontent.com/CodingJake/DataVoyage/main/data/AmesHousing.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
                setFilteredData(jsonData);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;
        
        let newFilteredData = data;

        if (selectedNeighborhood !== 'All') {
            newFilteredData = newFilteredData.filter(item => item.Neighborhood === selectedNeighborhood);
        }

        newFilteredData = newFilteredData.filter(item =>
            item.SalePrice >= priceRange[0] && item.SalePrice <= priceRange[1]
        );

        newFilteredData = newFilteredData.filter(item =>
            item.GrLivArea >= sqFtRange[0] && item.GrLivArea <= sqFtRange[1]
        );

        setFilteredData(newFilteredData);
    }, [selectedNeighborhood, priceRange, sqFtRange, data]);

    const neighborhoodOptions = ['All', ...Array.from(new Set(data.map(item => item.Neighborhood)))];

    const handleNeighborhoodChange = (value: string) => {
        setSelectedNeighborhood(value);
    };

    const handlePriceRangeChange = (value: number[]) => {
        setPriceRange(value);
    };

    const handleSqFtRangeChange = (value: number[]) => {
        setSqFtRange(value);
    };

    const CustomTooltip = ({ active, payload }: TooltipProps) => {
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

    const handleMouseEnter = (entry: any) => {
        setTooltipContent(
            <>
                <p className="label">{`Overall Quality: ${entry.OverallQual}`}</p>
                <p className="label">{`Year Built: ${entry.YearBuilt}`}</p>
            </>
        );
    };

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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const sqFtDomain = data.length ? [Math.min(...data.map(item => item.GrLivArea)), Math.max(...data.map(item => item.GrLivArea))] : [0, 5642];
    const priceDomain = data.length ? [Math.min(...data.map(item => item.SalePrice)), Math.max(...data.map(item => item.SalePrice))] : [0, 755000];

    if (loading) return <Layout><div className="container py-12 flex justify-center">Loading data...</div></Layout>;
    if (error) return <Layout><div className="container py-12 flex justify-center">Error: {error.message}</div></Layout>;

    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container px-4 md:px-6 py-8"
            >
                <h1 className="text-3xl font-bold mb-4">Interactive Data Explorer</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Neighborhood</CardTitle>
                            <CardDescription>Filter by neighborhood</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Select value={selectedNeighborhood} onValueChange={handleNeighborhoodChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a neighborhood" />
                                </SelectTrigger>
                                <SelectContent>
                                    {neighborhoodOptions.map(option => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Price Range</CardTitle>
                            <CardDescription>Filter by sale price</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
                                    className="w-24"
                                />
                                <div>-</div>
                                <Input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-24"
                                />
                            </div>
                            <Slider
                                defaultValue={priceRange}
                                onValueChange={handlePriceRangeChange}
                                min={priceDomain[0]}
                                max={priceDomain[1]}
                                step={1000}
                                className="mt-4"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Sq Footage Range</CardTitle>
                            <CardDescription>Filter by above ground living area</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="number"
                                    value={sqFtRange[0]}
                                    onChange={(e) => handleSqFtRangeChange([parseInt(e.target.value), sqFtRange[1]])}
                                    className="w-24"
                                />
                                <div>-</div>
                                <Input
                                    type="number"
                                    value={sqFtRange[1]}
                                    onChange={(e) => handleSqFtRangeChange([sqFtRange[0], parseInt(e.target.value)])}
                                    className="w-24"
                                />
                            </div>
                            <Slider
                                defaultValue={sqFtRange}
                                onValueChange={handleSqFtRangeChange}
                                min={sqFtDomain[0]}
                                max={sqFtDomain[1]}
                                step={100}
                                className="mt-4"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sale Price vs. Living Area</CardTitle>
                            <CardDescription>A scatter plot of sale price vs. living area</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="GrLivArea" name="Living Area (sq ft)" />
                                    <YAxis dataKey="SalePrice" name="Sale Price ($)" tickFormatter={(value) => value.toLocaleString()} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Line type="monotone" dataKey="SalePrice" stroke="#8884d8" activeDot={{ r: 8 }} onMouseEnter={handleMouseEnter} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Distribution of Neighborhoods</CardTitle>
                            <CardDescription>A pie chart of the distribution of houses by neighborhood</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <PieChart>
                                    <Pie
                                        data={filteredData.reduce((acc, item) => {
                                            const neighborhood = item.Neighborhood;
                                            const existing = acc.find(entry => entry.name === neighborhood);
                                            if (existing) {
                                                existing.value += 1;
                                            } else {
                                                acc.push({ name: neighborhood, value: 1 });
                                            }
                                            return acc;
                                        }, [])}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={160}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {
                                            filteredData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))
                                        }
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Overall Quality vs. Sale Price</CardTitle>
                        <CardDescription>A bar chart of average sale price by overall quality</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="OverallQual" name="Overall Quality" />
                                <YAxis dataKey="SalePrice" name="Average Sale Price ($)" tickFormatter={(value) => value.toLocaleString()} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="SalePrice" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </Layout>
    );
};

export default Explorer;
