
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Check, X, Shield, ArrowRight, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { detectDeepfake, saveToHistory, DeepfakeResult } from "@/services/deepfakeDetectionService";

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

  const ResultCard = ({ result }: { result: DeepfakeResult }) => {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {result.isAIGenerated ? (
                <Sparkles className="h-6 w-6 text-orange-500 mr-2" />
              ) : (
                <Check className="h-6 w-6 text-green-500 mr-2" />
              )}
              <h3 className="text-lg font-semibold">
                {result.isAIGenerated ? "AI-Generated Content Detected" : "Authentic Image"}
              </h3>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {result.confidence}% Confidence
            </span>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Real</span>
              <span>AI-Generated</span>
            </div>
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${result.isAIGenerated ? 'bg-orange-500' : 'bg-green-500'}`}
                style={{ width: `${result.confidence}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Analysis Details</h4>
              <p className="text-sm text-gray-600">
                Our {result.modelName} analyzed this image and determined it is {result.isAIGenerated ? "likely" : "unlikely"} to be AI-generated or manipulated.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Detection Classes</h4>
              <div className="space-y-2">
                {result.classes.map((cls, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{cls.label}</span>
                    <div className="flex items-center">
                      <Progress value={cls.score * 100} className="w-24 h-2 mr-2" />
                      <span className="text-xs font-mono">{(cls.score * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
                      <Card className="overflow-hidden">
                        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-64">
                          <Sparkles className="h-8 w-8 text-steg-purple animate-pulse mb-4" />
                          <h3 className="text-lg font-medium mb-2">Analyzing Image</h3>
                          <p className="text-gray-500 text-sm mb-4">
                            Our AI model is examining the image for signs of AI generation...
                          </p>
                          <Progress className="w-full max-w-xs" value={undefined} />
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-8 text-center border">
                        <Shield className="h-12 w-12 text-steg-purple mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                        <p className="text-gray-500 text-sm mb-4">
                          Click the button below to begin the AI detection process on your image.
                        </p>
                        <Button onClick={handleAnalyze} className="w-full">
                          Start AI Detection
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {result && (
              <div className="bg-gray-50 rounded-lg p-6 border">
                <h3 className="text-lg font-medium mb-4">Detection Explanation</h3>
                <p className="text-gray-600 mb-4">
                  {result.isAIGenerated 
                    ? "This image appears to have characteristics commonly found in AI-generated or manipulated content. The analysis detected patterns consistent with artificial creation methods." 
                    : "This image appears to be authentic. Our analysis did not detect significant patterns that would indicate it was generated or manipulated by AI."
                  }
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">What To Look For</h4>
                    <p className="text-sm text-gray-600">
                      AI-generated images often have subtle inconsistencies in facial features, unnatural backgrounds, irregular lighting, or unusual artifacts. Our model is trained to detect these patterns.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Limitations</h4>
                    <p className="text-sm text-gray-600">
                      No detection system is perfect. AI technology is constantly evolving, making detection challenging. Always use critical thinking when evaluating digital content.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Button onClick={handleReset} variant="outline">
                    Analyze Another Image
                  </Button>
                  
                  {result.isAIGenerated && (
                    <div className="flex items-center text-orange-600 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span>Content may be AI-generated</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DeepfakeDetection;
