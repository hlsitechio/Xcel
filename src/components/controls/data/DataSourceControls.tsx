import { Button } from "@/components/ui/button";
import { 
  Download,
  Upload,
  RefreshCw,
  Database,
  Globe,
  FileText
} from "lucide-react";

export const DataSourceControls = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground font-medium">Get & Transform Data</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Database className="h-4 w-4" />
          <span className="text-xs">Data</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <Globe className="h-4 w-4" />
          <span className="text-xs">Web</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex-col h-12 w-12 p-1">
          <FileText className="h-4 w-4" />
          <span className="text-xs">Text</span>
        </Button>
      </div>
    </div>
  );
};