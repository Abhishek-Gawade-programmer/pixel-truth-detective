
import React from "react";
import { Link } from "react-router-dom";
import { Microscope, History, Shield } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-steg-purple" />
            <span className="font-bold text-xl gradient-heading">Pixel Truth Detective</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="flex items-center space-x-1 text-steg-text hover:text-steg-purple transition-colors">
                  <Microscope className="h-4 w-4" />
                  <span>Analyze</span>
                </Link>
              </li>
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
  );
};

export default Navbar;
