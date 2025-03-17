
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import HistoryCard from "@/components/HistoryCard";
import { getAnalysisHistory } from "@/services/steganalysisService";
import { Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import SteganalysisResult from "@/components/SteganalysisResult";
import ImagePreview from "@/components/ImagePreview";

const History: React.FC = () => {
  const [history, setHistory] = useState<ReturnType<typeof getAnalysisHistory>>([]);
  const [selectedItem, setSelectedItem] = useState<(typeof history)[0] | null>(null);
  
  useEffect(() => {
    // Load history
    const loadHistory = () => {
      const historyData = getAnalysisHistory();
      setHistory(historyData);
    };
    
    loadHistory();
    
    // Listen for storage events (in case history is updated in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'steganalysis_history') {
        loadHistory();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleViewDetails = (item: (typeof history)[0]) => {
    setSelectedItem(item);
  };
  
  const closeDialog = () => {
    setSelectedItem(null);
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-heading">Analysis History</h1>
          <Link to="/">
            <Button>Analyze New Image</Button>
          </Link>
        </div>
        
        {history.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center border">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">No Analysis History</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              You haven't analyzed any images yet. Start by uploading an image for steganalysis.
            </p>
            <Link to="/">
              <Button>Analyze Your First Image</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-steg-purple/10 to-steg-blue/10 rounded-lg p-4 mb-6 flex items-center">
              <AlertCircle className="h-5 w-5 text-steg-purple mr-3 flex-shrink-0" />
              <p className="text-sm">
                Your analysis history is stored locally in your browser. Clearing your browser data will remove this history.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <HistoryCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  filename={item.filename}
                  date={item.date}
                  result={item.result}
                  onView={() => handleViewDetails(item)}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Details Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && closeDialog()}>
          <DialogContent className="max-w-4xl">
            {selectedItem && (
              <>
                <DialogHeader>
                  <DialogTitle>Analysis Details</DialogTitle>
                  <DialogDescription>
                    Results from the steganalysis performed on {selectedItem.filename}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Image</h3>
                    <ImagePreview 
                      imageUrl={selectedItem.imageUrl} 
                      filename={selectedItem.filename}
                      onReset={closeDialog}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-3">Detection Results</h3>
                    <SteganalysisResult 
                      result={selectedItem.result} 
                      isLoading={false} 
                    />
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default History;
