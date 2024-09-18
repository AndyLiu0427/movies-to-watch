import React from 'react';
import SortSelector from './SortSelector';
import OrderToggle from './OrderToggle';

type SortControlsProps = {
  onSortChange: (sortBy: string, isAsc: boolean) => void;
  currentSort: string;
  isAsc: boolean;
};

function SortControls({ onSortChange, currentSort, isAsc }: SortControlsProps) {
  const handleSortChange = (newSort: string) => {
    onSortChange(newSort, isAsc);
  };

  const handleOrderToggle = () => {
    if (currentSort) {
      onSortChange(currentSort, !isAsc);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <SortSelector onSortChange={handleSortChange} currentSort={currentSort} />
      {currentSort && <OrderToggle isAsc={isAsc} onToggle={handleOrderToggle} />}
    </div>
  );
};

export default SortControls;