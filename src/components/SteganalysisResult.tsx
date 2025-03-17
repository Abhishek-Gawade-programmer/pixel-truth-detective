
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react";

export interface SteganalysisResultData {
  overallScore: number;
  lsbScore: number;
  dctScore: number;
  hasHiddenData: boolean;
  confidence: number;
}

interface SteganalysisResultProps {
  result: SteganalysisResultData;
  isLoading: boolean;
}

const SteganalysisResult: React.FC<SteganalysisResultProps> = ({ result, isLoading }) => {
  const { overallScore, lsbScore, dctScore, hasHiddenData, confidence } = result;
  
  // Determine the status color based on the detection
  const getStatusColor = () => {
    if (isLoading) return "text-gray-400";
    return hasHiddenData ? "text-steg-red" : "text-green-500";
  };
  
  // Determine the status text based on the detection
  const getStatusText = () => {
    if (isLoading) return "Analyzing...";
    return hasHiddenData 
      ? "Hidden data detected!" 
      : "No hidden data detected";
  };
  
  // Get status icon based on detection
  const StatusIcon = () => {
    if (isLoading) return <Shield className="h-6 w-6 text-gray-400 animate-pulse-slow" />;
    return hasHiddenData 
      ? <AlertCircle className="h-6 w-6 text-steg-red" /> 
      : <CheckCircle2 className="h-6 w-6 text-green-500" />;
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Steganalysis Result</span>
            <div className={`flex items-center ${getStatusColor()}`}>
              <StatusIcon />
              <span className="ml-2 text-sm font-medium">{getStatusText()}</span>
            </div>
          </CardTitle>
          <CardDescription>
            {isLoading 
              ? "Processing your image..." 
              : "Analysis completed with the following results:"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="relative h-40 w-full bg-gray-100 rounded-md overflow-hidden">
              <div className="scanner-line animate-scanning"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-gray-500">Scanning image for hidden data...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Detection Score</span>
                  <span className="text-sm font-bold">{overallScore}%</span>
                </div>
                <Progress value={overallScore} className="h-2" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">LSB Analysis</span>
                    <span className="text-sm">{lsbScore}%</span>
                  </div>
                  <Progress value={lsbScore} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">DCT Analysis</span>
                    <span className="text-sm">{dctScore}%</span>
                  </div>
                  <Progress value={dctScore} className="h-1.5" />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Shield className="h-5 w-5 text-steg-purple" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Analysis Confidence</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {confidence >= 80 
                        ? "High confidence in this result. The analysis shows clear patterns."
                        : confidence >= 50
                        ? "Medium confidence in this result. There might be some ambiguity."
                        : "Low confidence in this result. The image might require further analysis."
                      }
                    </p>
                    <div className="mt-2">
                      <Progress value={confidence} className="h-1.5" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Low</span>
                        <span className="text-xs text-gray-500">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SteganalysisResult;
