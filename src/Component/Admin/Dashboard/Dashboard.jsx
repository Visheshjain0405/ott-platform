import React,{useState,useEffect} from 'react'
import Sidebar from '../Sidebar/Sidebar'

function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile or tablet based on window size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
        <div>
      {isMobile ? (
        <div className="mobile-message">
          <h2 className='text-xl text-white'>Admin Panel is not optimized for mobile devices.</h2>
          <p className='text-xl text-white'>Please use a laptop or desktop to access the Admin Panel.</p>
        </div>
      ) : (
        <div className="admin-panel">
          {/* Your Admin Panel content here */}
          <h1>Admin Panel</h1>
          {/* The rest of your admin panel components */}
          <Sidebar />
        </div>
      )}
    </div>
  )
}

export default Dashboard