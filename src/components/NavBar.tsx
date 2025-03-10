'use client';

import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-bold hover:text-gray-300 transition-colors"
        >
          Pokemon Explorer
        </Link>
        <div className="space-x-4">
          <Link 
            href="/compare" 
            className="hover:text-gray-300 transition-colors"
          >
            Compare
          </Link>
          <Link 
            href="/battle" 
            className="hover:text-gray-300 transition-colors"
          >
            Battle
          </Link>
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
