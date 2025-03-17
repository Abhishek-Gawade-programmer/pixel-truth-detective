
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ImagePreviewProps {
  imageUrl: string;
  filename: string;
  onReset: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, filename, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <AspectRatio ratio={16/9} className="bg-gray-100">
            <img
              src={imageUrl}
              alt="Image being analyzed"
              className="object-contain w-full h-full"
            />
          </AspectRatio>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
            <p className="text-white text-sm font-medium truncate">{filename}</p>
          </div>
        </div>
        <div className="flex border-t p-2">
          <Button variant="ghost" size="sm" className="flex-1 h-9" onClick={() => window.open(imageUrl, '_blank')}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 h-9" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 h-9 text-steg-red" onClick={onReset}>
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagePreview;
