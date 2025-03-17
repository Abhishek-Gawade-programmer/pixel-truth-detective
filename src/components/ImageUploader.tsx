
import React, { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploaderProps {
  onImageSelected: (file: File, preview: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    processFiles(files);
  }, []);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  }, []);
  
  const processFiles = (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageSelected(file, e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragging ? "border-steg-purple bg-steg-purple/5" : "border-gray-300 hover:border-steg-purple/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-steg-purple/10 flex items-center justify-center">
          <Upload className="h-8 w-8 text-steg-purple" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Drag and drop your image here</h3>
          <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-gray-500 mt-2 max-w-md">
          <div className="flex items-center justify-center p-2 rounded bg-gray-50">
            <ImageIcon className="h-3 w-3 mr-1" />
            <span>PNG, JPG, JPEG</span>
          </div>
          <div className="flex items-center justify-center p-2 rounded bg-gray-50">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>Max 10MB</span>
          </div>
          <div className="flex items-center justify-center p-2 rounded bg-gray-50">
            <ImageIcon className="h-3 w-3 mr-1" />
            <span>Min 100×100px</span>
          </div>
        </div>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleFileInput}
        />
        <label htmlFor="image-upload">
          <Button
            type="button"
            variant="default"
            className="cursor-pointer"
            asChild
          >
            <span>Select image</span>
          </Button>
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
