
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SteganalysisResultData } from "./SteganalysisResult";

interface HistoryCardProps {
  imageUrl: string;
  filename: string;
  date: Date;
  result: SteganalysisResultData;
  onView: () => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ imageUrl, filename, date, result, onView }) => {
  const { hasHiddenData, overallScore } = result;
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="relative flex-shrink-0">
          <AspectRatio ratio={16/9} className="bg-gray-100">
            <img
              src={imageUrl}
              alt="Previously analyzed image"
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <div className="absolute top-2 right-2">
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              hasHiddenData ? "bg-steg-red/20 text-steg-red" : "bg-green-500/20 text-green-500"
            }`}>
              {hasHiddenData 
                ? <><AlertCircle className="h-3 w-3" /> Suspicious</>
                : <><CheckCircle2 className="h-3 w-3" /> Clean</>
              }
            </div>
          </div>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium text-sm line-clamp-1">{filename}</h3>
          <p className="text-xs text-gray-500 mt-1">
            {format(date, "MMM d, yyyy 'at' h:mm a")}
          </p>
          
          <div className="flex items-center mt-3 space-x-3">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>Detection Score</span>
                <span className="font-medium">{overallScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${hasHiddenData ? "bg-steg-red" : "bg-green-500"}`}
                  style={{ width: `${overallScore}%` }}
                ></div>
              </div>
            </div>
            <div>
              <Shield className={`h-5 w-5 ${hasHiddenData ? "text-steg-red" : "text-green-500"}`} />
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <Button variant="outline" className="w-full" size="sm" onClick={onView}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
