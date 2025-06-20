import React from 'react';
import { Search, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <div className="bg-white">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black tracking-tight">ECOMMERCE</h1>
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors">
              Sale
            </a>
            <a href="#" className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors">
              Clearance
            </a>
            <a href="#" className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors">
              New stock
            </a>
            <a href="#" className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors">
              Trending
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Help</a>
              <a href="#" className="hover:text-black transition-colors">Orders & Returns</a>
              {userName && <span className="text-black">Hi, {userName}</span>}
            </div>
            <button className="p-2 text-gray-600 hover:text-black transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-black transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-4">
            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-sm text-gray-700 font-medium">
              Get 10% off on business sign up
            </p>
            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;