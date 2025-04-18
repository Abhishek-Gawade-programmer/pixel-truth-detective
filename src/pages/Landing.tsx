
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Microscope, Sparkles, History } from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-steg-purple" />
              <span className="font-bold text-xl gradient-heading">Pixel Truth Detective</span>
            </div>
            <nav>
              <ul className="flex space-x-8">
                <li>
                  <Link to="/history" className="flex items-center space-x-1 text-steg-text hover:text-steg-purple transition-colors">
                    <History className="h-4 w-4" />
                    <span>History</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-white to-steg-bg">
        <div className="max-w-4xl w-full text-center space-y-12">
          <div className="space-y-6">
            <Shield className="h-24 w-24 text-steg-purple mx-auto" />
            <h1 className="text-5xl sm:text-6xl font-bold gradient-heading">
              Pixel Truth Detective
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Uncover hidden data in images with advanced steganalysis technology. 
              Verify the authenticity of your digital content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white border rounded-xl p-10 shadow-md">
              <div className="space-y-12">
                <div className="flex items-center justify-center space-x-5 px-0 py-[20px]">
                  <div className="w-14 h-14 rounded-full bg-steg-purple/10 flex items-center justify-center">
                    <Microscope className="h-7 w-7 text-steg-purple" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-semibold text-2xl">Steganalysis</h2>
                    <p className="text-gray-600 mt-1">Detect hidden messages in your images</p>
                  </div>
                </div>
                
                <Link to="/analyze">
                  <Button className="w-full h-14 text-lg group bg-gradient-to-r from-steg-purple to-steg-blue hover:from-steg-blue hover:to-steg-purple transition-all duration-300" size="lg">
                    Start Steganalysis
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-10 shadow-md">
              <div className="space-y-12">
                <div className="flex items-center justify-center space-x-5 px-0 py-[20px]">
                  <div className="w-14 h-14 rounded-full bg-steg-purple/10 flex items-center justify-center">
                    <Sparkles className="h-7 w-7 text-steg-purple" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-semibold text-2xl">Deepfake Detection</h2>
                    <p className="text-gray-600 mt-1">Identify AI-generated or manipulated images</p>
                  </div>
                </div>
                
                <Link to="/deepfake">
                  <Button className="w-full h-14 text-lg group bg-gradient-to-r from-steg-purple to-steg-blue hover:from-steg-blue hover:to-steg-purple transition-all duration-300" size="lg">
                    Detect AI Images
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-lg mb-2">LSB Detection</h3>
              <p className="text-gray-600">
                Detect hidden data in the least significant bits of your images.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Deepfake Analysis</h3>
              <p className="text-gray-600">
                Identify if an image was created or manipulated by AI technology.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Save Results</h3>
              <p className="text-gray-600">
                Keep a history of all your analyzed images for future reference.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Pixel Truth Detective | Steganalysis Tool</p>
        </div>
      </footer>
    </div>;
};

export default Landing;

