
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { DeepfakeResult } from "@/services/deepfakeDetectionService";

interface AnalysisExplanationProps {
  result: DeepfakeResult;
  onReset: () => void;
}

const AnalysisExplanation: React.FC<AnalysisExplanationProps> = ({ result, onReset }) => {
  return (
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
        <Button onClick={onReset} variant="outline">
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
  );
};

export default AnalysisExplanation;
