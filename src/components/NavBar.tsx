'use client';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <a 
          href="http://localhost:3000" 
          className="text-white no-underline text-xl font-bold"
        >
          Pokemon Lookup
        </a>
        <div>
          <a 
            href="http://localhost:3000" 
            className="text-white no-underline mr-4 px-4 py-2"
          >
            Home
          </a>
          <a 
            href="http://localhost:3000/compare" 
            className="text-white no-underline mr-4 px-4 py-2"
          >
            Compare
          </a>
          <a 
            href="http://localhost:3000/battle" 
            className="text-white no-underline px-4 py-2"
          >
            Battle
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
