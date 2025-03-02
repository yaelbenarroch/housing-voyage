
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import Layout from "@/components/common/Layout";
import { fetchHousingData } from "@/utils/data-fetching";
import NeighborhoodFilter from "@/components/explorer/NeighborhoodFilter";
import RangeFilter from "@/components/explorer/RangeFilter";
import PriceVsAreaChart from "@/components/explorer/PriceVsAreaChart";
import NeighborhoodPieChart from "@/components/explorer/NeighborhoodPieChart";
import QualityPriceBarChart from "@/components/explorer/QualityPriceBarChart";

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
        const loadData = async () => {
            setLoading(true);
            try {
                const jsonData = await fetchHousingData();
                setData(jsonData);
                setFilteredData(jsonData);
            } catch (e) {
                setError(e as Error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
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

    const handleMouseEnter = (entry: any) => {
        setTooltipContent(
            <>
                <p className="label">{`Overall Quality: ${entry.OverallQual}`}</p>
                <p className="label">{`Year Built: ${entry.YearBuilt}`}</p>
            </>
        );
    };

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
                    <NeighborhoodFilter
                        selectedNeighborhood={selectedNeighborhood}
                        neighborhoodOptions={neighborhoodOptions}
                        onNeighborhoodChange={handleNeighborhoodChange}
                    />

                    <RangeFilter
                        title="Price Range"
                        description="Filter by sale price"
                        range={priceRange}
                        min={priceDomain[0]}
                        max={priceDomain[1]}
                        step={1000}
                        onRangeChange={handlePriceRangeChange}
                        formatPrefix="$"
                    />

                    <RangeFilter
                        title="Sq Footage Range"
                        description="Filter by above ground living area"
                        range={sqFtRange}
                        min={sqFtDomain[0]}
                        max={sqFtDomain[1]}
                        step={100}
                        onRangeChange={handleSqFtRangeChange}
                        formatSuffix="sq ft"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <PriceVsAreaChart
                        data={filteredData}
                        tooltipContent={tooltipContent}
                        handleMouseEnter={handleMouseEnter}
                    />

                    <NeighborhoodPieChart
                        data={filteredData}
                        tooltipContent={tooltipContent}
                    />
                </div>

                <QualityPriceBarChart
                    data={filteredData}
                    tooltipContent={tooltipContent}
                />
            </motion.div>
        </Layout>
    );
};

export default Explorer;
