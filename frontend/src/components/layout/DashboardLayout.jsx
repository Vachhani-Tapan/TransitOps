import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const COLLAPSED_KEY = 'transitops-sidebar-collapsed';

export default function DashboardLayout() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem(COLLAPSED_KEY) === 'true';
  });

  // Keep responsive window width state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarCollapse = (val) => {
    setCollapsed(val);
    localStorage.setItem(COLLAPSED_KEY, String(val));
  };

  // Protected route guard
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const marginOffset = isMobile ? '0px' : (collapsed ? '70px' : '240px');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', width: '100vw' }}>
      <Sidebar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        collapsed={collapsed}
        setCollapsed={handleSidebarCollapse}
      />
      
      <div 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          marginLeft: marginOffset,
          transition: 'margin-left 200ms ease',
          overflowX: 'hidden'
        }}
      >
        <Topbar setMobileMenuOpen={setMobileMenuOpen} />
        
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
