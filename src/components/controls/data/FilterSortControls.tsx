import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter, Search } from "lucide-react";

export const FilterSortControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Sort & Filter</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <ArrowUpDown className="h-4 w-4" />
          <span className="text-xs">Sort</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Filter className="h-4 w-4" />
          <span className="text-xs">Filter</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Search className="h-4 w-4" />
          <span className="text-xs">Find</span>
        </Button>
      </div>
    </div>
  );
};