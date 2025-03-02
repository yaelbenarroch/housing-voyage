
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FilterCard from './FilterCard';

interface NeighborhoodFilterProps {
  selectedNeighborhood: string;
  neighborhoodOptions: string[];
  onNeighborhoodChange: (value: string) => void;
}

const NeighborhoodFilter: React.FC<NeighborhoodFilterProps> = ({ 
  selectedNeighborhood, 
  neighborhoodOptions, 
  onNeighborhoodChange 
}) => {
  return (
    <FilterCard
      title="Neighborhood"
      description="Filter by neighborhood"
    >
      <Select value={selectedNeighborhood} onValueChange={onNeighborhoodChange}>
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
    </FilterCard>
  );
};

export default NeighborhoodFilter;
