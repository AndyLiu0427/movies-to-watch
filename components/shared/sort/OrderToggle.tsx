import React from 'react';
import { Button } from "@/components/ui/button"
import { ArrowUpNarrowWide, ArrowDownNarrowWide } from 'lucide-react';

type OrderToggleProps = {
  isAsc: boolean;
  onToggle: () => void;
};

function OrderToggle({ isAsc, onToggle }: OrderToggleProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onToggle}
      aria-label={isAsc ? "切换为降序" : "切换为升序"}
    >
      {isAsc ? (
        <ArrowUpNarrowWide className="h-4 w-4" />
      ) : (
        <ArrowDownNarrowWide className="h-4 w-4" />
      )}
    </Button>
  );
}

export default OrderToggle;