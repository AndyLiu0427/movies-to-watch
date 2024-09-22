import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: 'default', label: '排序方式' },
  { value: 'vote_average', label: '評分' },
  { value: 'release_date', label: '上映日期' },
];

type SortSelectorProps = {
  onSortChange: (sortBy: string) => void;
  currentSort: string;
};

function SortSelector ({ onSortChange, currentSort }: SortSelectorProps) {
  const handleValueChange = (value: string) => {
    onSortChange(value === 'default' ? '' : value);
  };

  return (
    <Select
      value={currentSort || 'default'}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px] text-white" aria-label="Sort movies">
        <SelectValue className="text-white" placeholder="選擇排序方式" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelector;