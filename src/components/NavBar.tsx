'use client';

const NavBar = () => {
  return (
    <nav style={{ backgroundColor: '#1f2937', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <a 
          href="http://localhost:3000" 
          style={{ color: 'white', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold' }}
        >
          Pokemon Lookup
        </a>
        <div>
          <a 
            href="http://localhost:3000" 
            style={{ color: 'white', textDecoration: 'none', marginRight: '1rem', padding: '0.5rem 1rem' }}
          >
            Home
          </a>
          <a 
            href="http://localhost:3000/compare" 
            style={{ color: 'white', textDecoration: 'none', marginRight: '1rem', padding: '0.5rem 1rem' }}
          >
            Compare
          </a>
          <a 
            href="http://localhost:3000/battle" 
            style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem' }}
          >
            Battle
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
