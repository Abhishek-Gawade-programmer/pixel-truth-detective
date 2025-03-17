
import React, { useState } from "react";
import Layout from "@/components/Layout";
import ImageUploader from "@/components/ImageUploader";
import ImagePreview from "@/components/ImagePreview";
import SteganalysisResult from "@/components/SteganalysisResult";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import { analyzeImage, saveToHistory } from "@/services/steganalysisService";
import { SteganalysisResultData } from "@/components/SteganalysisResult";
import { useToast } from "@/components/ui/use-toast";

const Index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SteganalysisResultData | null>(null);
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
      const analysisResult = await analyzeImage(selectedImage);
      
      // Save to history
      if (imagePreview) {
        saveToHistory(imagePreview, selectedImage.name, analysisResult);
      }
      
      // Update state with results
      setResult(analysisResult);
      
      // Show success notification
      toast({
        title: "Analysis Complete",
        description: analysisResult.hasHiddenData 
          ? "Suspicious content detected in this image." 
          : "No hidden data detected in this image.",
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
          <h1 className="text-4xl font-bold gradient-heading">Pixel Truth Detective</h1>
          <p className="text-lg text-gray-600 mt-2">
            Upload an image to analyze for hidden data using steganalysis
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
                  <SteganalysisResult result={result} isLoading={false} />
                ) : (
                  <>
                    {isAnalyzing ? (
                      <SteganalysisResult 
                        result={{
                          overallScore: 0,
                          lsbScore: 0,
                          dctScore: 0,
                          hasHiddenData: false,
                          confidence: 0
                        }} 
                        isLoading={true} 
                      />
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-8 text-center border">
                        <Shield className="h-12 w-12 text-steg-purple mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
                        <p className="text-gray-500 text-sm mb-4">
                          Click the button below to begin the steganalysis process on your image.
                        </p>
                        <Button onClick={handleAnalyze} className="w-full">
                          Start Analysis
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
                  {result.hasHiddenData 
                    ? "This image appears to contain hidden data or has been manipulated. The steganalysis has detected patterns consistent with steganography techniques." 
                    : "This image appears to be clean. No significant patterns of hidden data were detected during the steganalysis process."
                  }
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">LSB Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Least Significant Bit (LSB) analysis examines the least important bits in an image's pixels, which are often used to hide data. 
                      {result.lsbScore > 60 
                        ? " Our analysis found abnormal patterns in these bits, suggesting potential hidden data." 
                        : " Our analysis found normal patterns in these bits, suggesting no hidden data."
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">DCT Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Discrete Cosine Transform (DCT) analysis examines frequency components of the image, which can reveal modifications made to hide information.
                      {result.dctScore > 60 
                        ? " Abnormal frequency patterns were detected in this image." 
                        : " No abnormal frequency patterns were detected in this image."
                      }
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button onClick={handleReset} variant="outline">
                    Analyze Another Image
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
