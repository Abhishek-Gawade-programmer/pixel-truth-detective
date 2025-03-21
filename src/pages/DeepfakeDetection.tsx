
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import { useToast } from "@/components/ui/use-toast";
import { detectDeepfake, saveToHistory, DeepfakeResult } from "@/services/deepfakeDetectionService";

// Import refactored components
import ResultCard from "@/components/deepfake/ResultCard";
import AnalysisLoading from "@/components/deepfake/AnalysisLoading";
import AnalysisPrompt from "@/components/deepfake/AnalysisPrompt";
import AnalysisExplanation from "@/components/deepfake/AnalysisExplanation";

const DeepfakeDetection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DeepfakeResult | null>(null);
  const { toast } = useToast();
  
  const handleImageSelected = (file: File, preview: string) => {
    setSelectedImage(file);
    setImagePreview(preview);
    setResult(null);
  };
  
  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setIsAnalyzing(false);
  };
  
  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    try {
      // Analyze the image
      const detectionResult = await detectDeepfake(selectedImage);
      
      // Save to history
      if (imagePreview) {
        saveToHistory(imagePreview, selectedImage.name, detectionResult);
      }
      
      // Update state with results
      setResult(detectionResult);
      
      // Show success notification
      toast({
        title: "Analysis Complete",
        description: detectionResult.isAIGenerated 
          ? "This image appears to be AI-generated or manipulated." 
          : "This image appears to be authentic.",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-heading">AI-Generated Image Detection</h1>
          <p className="text-lg text-gray-600 mt-2">
            Upload an image to detect if it was created or manipulated by AI
          </p>
        </div>
        
        {!selectedImage ? (
          <ImageUploader onImageSelected={handleImageSelected} />
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Image</h2>
                <ImagePreview 
                  imageUrl={imagePreview!} 
                  filename={selectedImage.name}
                  onReset={handleReset}
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Results</h2>
                {result ? (
                  <ResultCard result={result} />
                ) : (
                  <>
                    {isAnalyzing ? (
                      <AnalysisLoading />
                    ) : (
                      <AnalysisPrompt onAnalyze={handleAnalyze} />
                    )}
                  </>
                )}
              </div>
            </div>
            
            {result && (
              <AnalysisExplanation result={result} onReset={handleReset} />
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DeepfakeDetection;
