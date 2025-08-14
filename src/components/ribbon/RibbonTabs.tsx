import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeTab } from "./tabs/HomeTab";
import { InsertTab } from "./tabs/InsertTab";
import { PageLayoutTab } from "./tabs/PageLayoutTab";
import { FormulasTab } from "./tabs/FormulasTab";
import { DataTab } from "./tabs/DataTab";
import { ReviewTab } from "./tabs/ReviewTab";
import { ViewTab } from "./tabs/ViewTab";
import { AutomateTab } from "./tabs/AutomateTab";
import { HelpTab } from "./tabs/HelpTab";
import { DrawTab } from "./tabs/DrawTab";

interface RibbonTabsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExportCSV: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  selectedCell: { row: number; col: number } | null;
}

export const RibbonTabs = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onExportCSV,
  onAddRow,
  onAddColumn,
  selectedCell,
}: RibbonTabsProps) => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="border-b border-border bg-card">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-10 h-auto p-0 bg-transparent border-b border-border rounded-none">
          <TabsTrigger 
            value="home" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Home
          </TabsTrigger>
          <TabsTrigger 
            value="insert"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Insert
          </TabsTrigger>
          <TabsTrigger 
            value="page-layout"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Page Layout
          </TabsTrigger>
          <TabsTrigger 
            value="formulas"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Formulas
          </TabsTrigger>
          <TabsTrigger 
            value="data"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Data
          </TabsTrigger>
          <TabsTrigger 
            value="review"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Review
          </TabsTrigger>
          <TabsTrigger 
            value="view"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            View
          </TabsTrigger>
          <TabsTrigger 
            value="automate"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Automate
          </TabsTrigger>
          <TabsTrigger 
            value="help"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Help
          </TabsTrigger>
          <TabsTrigger 
            value="draw"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-2"
          >
            Draw
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="m-0 p-4">
          <HomeTab 
            onExportCSV={onExportCSV}
            onAddRow={onAddRow}
            onAddColumn={onAddColumn}
            selectedCell={selectedCell}
          />
        </TabsContent>

        <TabsContent value="insert" className="m-0 p-4">
          <InsertTab />
        </TabsContent>

        <TabsContent value="page-layout" className="m-0 p-4">
          <PageLayoutTab />
        </TabsContent>

        <TabsContent value="formulas" className="m-0 p-4">
          <FormulasTab />
        </TabsContent>

        <TabsContent value="data" className="m-0 p-4">
          <DataTab />
        </TabsContent>

        <TabsContent value="review" className="m-0 p-4">
          <ReviewTab />
        </TabsContent>

        <TabsContent value="view" className="m-0 p-4">
          <ViewTab 
            zoom={zoom}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
          />
        </TabsContent>

        <TabsContent value="automate" className="m-0 p-4">
          <AutomateTab />
        </TabsContent>

        <TabsContent value="help" className="m-0 p-4">
          <HelpTab />
        </TabsContent>

        <TabsContent value="draw" className="m-0 p-4">
          <DrawTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};