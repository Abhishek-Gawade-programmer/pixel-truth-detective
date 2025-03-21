
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

interface AnalysisPromptProps {
  onAnalyze: () => void;
}

const AnalysisPrompt: React.FC<AnalysisPromptProps> = ({ onAnalyze }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center border">
      <Shield className="h-12 w-12 text-steg-purple mx-auto mb-4" />
      <h3 className="text-lg font-medium mb-2">Ready to Analyze</h3>
      <p className="text-gray-500 text-sm mb-4">
        Click the button below to begin the AI detection process on your image.
      </p>
      <Button onClick={onAnalyze} className="w-full">
        Start AI Detection
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default AnalysisPrompt;
