import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getRoleTitle } from '../../config/roleConfig';

const PAGE_NAMES = {
  '/dashboard': 'Dashboard Overview',
  '/vehicles': 'Vehicle Registry',
  '/trips': 'Trip Planner & Dispatch',
  '/maintenance': 'Maintenance Logs',
  '/drivers': 'Driver Profiles',
  '/analytics': 'Financial Analysis & ROI',
};

export default function Topbar({ setMobileMenuOpen }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showNotif, setShowNotif] = useState(false);

  const pageTitle = PAGE_NAMES[location.pathname] || 'TransitOps';

  return (
    <header style={{
      position: 'sticky', top: 0,
      height: 64,
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 50,
    }}>
      {/* Mobile Toggle & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => setMobileMenuOpen(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, borderRadius: 6, display: 'flex', alignItems: 'center',
            color: '#475569'
          }}
          className="mobile-only-btn"
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
          <span style={{ color: '#64748b', fontWeight: 500 }}>TransitOps</span>
          <span style={{ color: '#94a3b8' }}>/</span>
          <span style={{ fontWeight: 700, color: '#0f172a' }}>{pageTitle}</span>
        </div>
      </div>

      {/* Action items */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotif(!showNotif)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, borderRadius: '50%', display: 'flex', alignItems: 'center',
              color: '#475569', transition: 'background-color 150ms ease',
              position: 'relative'
            }}
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 8, height: 8, borderRadius: '50%',
              background: '#f97316', // orange notification dot
            }} />
          </button>

          {showNotif && (
            <>
              <div 
                onClick={() => setShowNotif(false)} 
                style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 100 }} 
              />
              <div style={{
                position: 'absolute', top: '100%', right: 0,
                marginTop: 8, width: 280,
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                padding: '12px',
                zIndex: 101,
              }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: 6 }}>
                  Notifications
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: '0.75rem', color: '#475569', padding: '4px 0' }}>
                    🟢 System online. Connected to Supabase Database.
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#475569', padding: '4px 0' }}>
                    🚨 Maintenance logs checked: 1 vehicle currently in shop.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, height: 20, backgroundColor: '#e2e8f0' }} />

        {/* User Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#ffedd5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#f97316', fontWeight: 700, fontSize: '0.8rem'
          }}>
            <User size={16} />
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }} className="desktop-only">
            {user?.name || 'User'} ({getRoleTitle(user?.role)})
          </span>
        </div>
      </div>
    </header>
  );
}
