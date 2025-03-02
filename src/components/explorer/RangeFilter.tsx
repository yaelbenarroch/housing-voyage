
import React from 'react';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import FilterCard from './FilterCard';

interface RangeFilterProps {
  title: string;
  description: string;
  range: number[];
  min: number;
  max: number;
  step: number;
  onRangeChange: (value: number[]) => void;
  formatPrefix?: string;
  formatSuffix?: string;
}

const RangeFilter: React.FC<RangeFilterProps> = ({ 
  title, 
  description, 
  range, 
  min, 
  max, 
  step, 
  onRangeChange,
  formatPrefix = '',
  formatSuffix = ''
}) => {
  return (
    <FilterCard
      title={title}
      description={description}
    >
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={range[0]}
          onChange={(e) => onRangeChange([parseInt(e.target.value), range[1]])}
          className="w-24"
        />
        <div>-</div>
        <Input
          type="number"
          value={range[1]}
          onChange={(e) => onRangeChange([range[0], parseInt(e.target.value)])}
          className="w-24"
        />
      </div>
      <Slider
        defaultValue={range}
        onValueChange={onRangeChange}
        min={min}
        max={max}
        step={step}
        className="mt-4"
      />
    </FilterCard>
  );
};

export default RangeFilter;
