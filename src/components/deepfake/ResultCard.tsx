
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Check } from "lucide-react";
import { DeepfakeResult } from "@/services/deepfakeDetectionService";

interface ResultCardProps {
  result: DeepfakeResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
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

export default ResultCard;
