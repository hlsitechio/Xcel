import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataSourceControls } from "@/components/controls/data/DataSourceControls";
import { FilterSortControls } from "@/components/controls/data/FilterSortControls";
import { 
  RefreshCw,
  Link,
  FileText,
  ArrowUpDown
} from "lucide-react";

export const DataTab = () => {
  return (
    <div className="flex items-center gap-6">
      <DataSourceControls />

      <Separator orientation="vertical" className="h-16" />

      {/* Connections Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Connections</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <RefreshCw className="h-4 w-4" />
            <span className="text-xs">Refresh</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <Link className="h-4 w-4" />
            <span className="text-xs">Links</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      <FilterSortControls />

      <Separator orientation="vertical" className="h-16" />

      {/* Data Tools Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Data Tools</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <FileText className="h-4 w-4" />
            <span className="text-xs">Text to Columns</span>
          </Button>
        </div>
      </div>

      <Separator orientation="vertical" className="h-16" />

      {/* Forecast Group */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-xs text-muted-foreground font-medium">Forecast</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="flex-col h-12 w-16 p-1">
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-xs">Forecast</span>
          </Button>
        </div>
      </div>
    </div>
  );
};