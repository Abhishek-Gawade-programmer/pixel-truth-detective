
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

const AnalysisLoading: React.FC = () => {
  return (
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
  );
};

export default AnalysisLoading;
