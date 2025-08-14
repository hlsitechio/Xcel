import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Keyboard, Info } from "lucide-react";
import { keyboardManager } from "@/utils/keyboard/keyboardManager";

export const KeyboardShortcutsDialog = () => {
  const [open, setOpen] = useState(false);

  const categories = {
    navigation: "Navigation & Selection",
    editing: "Editing & Data Entry", 
    formatting: "Formatting",
    formulas: "Formulas & Calculations",
    misc: "General Actions"
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Keyboard className="h-4 w-4" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="navigation" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {Object.entries(categories).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {label.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(categories).map(([categoryKey, categoryLabel]) => (
            <TabsContent key={categoryKey} value={categoryKey} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-semibold">{categoryLabel}</h3>
                <Badge variant="secondary">
                  {keyboardManager.getShortcutsByCategory(categoryKey as any).length} shortcuts
                </Badge>
              </div>
              
              <div className="grid gap-2">
                {keyboardManager.getShortcutsByCategory(categoryKey as any).map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                    <span className="text-sm text-muted-foreground flex-1">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {keyboardManager.formatShortcutDisplay(shortcut).split(' + ').map((key, keyIndex) => (
                        <Badge key={keyIndex} variant="outline" className="font-mono text-xs">
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-1">Pro Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Use <Badge variant="outline" className="mx-1 font-mono">Ctrl + Click</Badge> to select multiple cells</li>
                <li>• Use <Badge variant="outline" className="mx-1 font-mono">Shift + Click</Badge> to select ranges</li>
                <li>• Use <Badge variant="outline" className="mx-1 font-mono">Shift + F10</Badge> for context menu</li>
                <li>• Some advanced features are still in development</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};