
import { SteganalysisResultData } from "@/components/SteganalysisResult";

// This is a mock service for steganalysis
// In a real application, this would be connected to a backend service with actual steganalysis algorithms

// Helper function to introduce a random delay to simulate processing time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get a random value within a range
const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to simulate steganalysis on an image
export const analyzeImage = async (imageFile: File): Promise<SteganalysisResultData> => {
  // Simulate processing time
  await delay(2000 + Math.random() * 2000);
  
  // In a real application, we would analyze the image here
  // For this demo, we'll generate random results
  
  // Determine if the image "has hidden data" based on random values
  // In a real app, this would be determined by actual steganalysis algorithms
  const lsbScore = getRandomValue(0, 100);
  const dctScore = getRandomValue(0, 100);
  
  // Calculate overall score as a weighted average
  const overallScore = Math.round((lsbScore * 0.6 + dctScore * 0.4));
  
  // Determine if the image has hidden data based on the overall score
  const hasHiddenData = overallScore > 60;
  
  // Calculate confidence level
  const confidence = getRandomValue(50, 95);
  
  return {
    overallScore,
    lsbScore,
    dctScore,
    hasHiddenData,
    confidence
  };
};

// Store the history of analyzed images
interface AnalysisHistoryItem {
  id: string;
  imageUrl: string;
  filename: string;
  date: Date;
  result: SteganalysisResultData;
}

const HISTORY_KEY = 'steganalysis_history';

// Save analysis to history
export const saveToHistory = (
  imageUrl: string,
  filename: string,
  result: SteganalysisResultData
): void => {
  const historyItem: AnalysisHistoryItem = {
    id: Date.now().toString(),
    imageUrl,
    filename,
    date: new Date(),
    result
  };
  
  // Get current history
  const history = getAnalysisHistory();
  
  // Add new item to the beginning
  history.unshift(historyItem);
  
  // Limit history to 50 items
  const limitedHistory = history.slice(0, 50);
  
  // Save to localStorage
  localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
};

// Get analysis history
export const getAnalysisHistory = (): AnalysisHistoryItem[] => {
  const historyString = localStorage.getItem(HISTORY_KEY);
  
  if (!historyString) {
    return [];
  }
  
  try {
    const history = JSON.parse(historyString);
    
    // Ensure dates are converted back to Date objects
    return history.map((item: any) => ({
      ...item,
      date: new Date(item.date)
    }));
  } catch (error) {
    console.error('Error parsing history:', error);
    return [];
  }
};

// Get a specific analysis by ID
export const getAnalysisById = (id: string): AnalysisHistoryItem | undefined => {
  const history = getAnalysisHistory();
  return history.find(item => item.id === id);
};
