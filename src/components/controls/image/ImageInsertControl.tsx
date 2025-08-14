import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ImageInsertControlProps {
  onImageUpload: (imageData: string[][], imageInfo: { width: number; height: number; cellsX: number; cellsY: number }) => void;
}

export const ImageInsertControl = ({ onImageUpload }: ImageInsertControlProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
      toast({
        title: "Invalid File Type",
        description: "Please select a PNG or JPEG image",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgElement = new window.Image();
      imgElement.onload = () => {
        processImage(imgElement);
      };
      imgElement.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const processImage = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to image size
    canvas.width = img.width;
    canvas.height = img.height;
    
    // Draw the image on canvas
    ctx.drawImage(img, 0, 0);

    // Default cell size (configurable)
    const cellWidth = 120;
    const cellHeight = 32;
    
    // Calculate how many cells we need
    const cellsX = Math.ceil(img.width / cellWidth);
    const cellsY = Math.ceil(img.height / cellHeight);
    
    // Create the image data array
    const imageData: string[][] = [];
    
    for (let row = 0; row < cellsY; row++) {
      const rowData: string[] = [];
      for (let col = 0; col < cellsX; col++) {
        // Create a small canvas for each cell
        const cellCanvas = document.createElement('canvas');
        const cellCtx = cellCanvas.getContext('2d');
        if (!cellCtx) continue;
        
        cellCanvas.width = cellWidth;
        cellCanvas.height = cellHeight;
        
        // Calculate source position
        const sourceX = col * cellWidth;
        const sourceY = row * cellHeight;
        const sourceWidth = Math.min(cellWidth, img.width - sourceX);
        const sourceHeight = Math.min(cellHeight, img.height - sourceY);
        
        // Draw the image chunk to the cell canvas
        if (sourceWidth > 0 && sourceHeight > 0) {
          cellCtx.drawImage(
            img,
            sourceX, sourceY, sourceWidth, sourceHeight,
            0, 0, sourceWidth, sourceHeight
          );
        }
        
        // Convert to data URL and store
        const cellDataUrl = cellCanvas.toDataURL('image/png');
        rowData.push(cellDataUrl);
      }
      imageData.push(rowData);
    }
    
    onImageUpload(imageData, {
      width: img.width,
      height: img.height,
      cellsX,
      cellsY
    });

    toast({
      title: "Image Inserted",
      description: `Image split into ${cellsX}×${cellsY} cells`,
    });

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex-col h-12 w-12 p-1"
        onClick={handleButtonClick}
      >
        <Image className="h-4 w-4" />
        <span className="text-xs">Image</span>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
      />
    </>
  );
};