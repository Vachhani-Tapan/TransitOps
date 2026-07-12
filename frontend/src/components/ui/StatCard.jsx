export default function StatCard({ icon: Icon, label, value, sub, delta, deltaLabel }) {
  const isPositiveDelta = delta && delta > 0;
  
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: 12,
      padding: '18px 20px',
      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 4 }}>
            {label}
          </span>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', display: 'block' }}>
            {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
          </span>
        </div>
        {Icon && (
          <div style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
            <Icon size={24} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {delta !== undefined && delta !== null && (
        <span style={{ fontSize: '0.725rem', fontWeight: 700, marginTop: 8, color: isPositiveDelta ? '#166534' : '#991b1b', display: 'block' }}>
          {isPositiveDelta ? '↑' : '↓'} {Math.abs(delta)}% <span style={{ color: '#64748b', fontWeight: 500 }}>{deltaLabel || 'vs yesterday'}</span>
        </span>
      )}

      {sub && !delta && (
        <span style={{ fontSize: '0.725rem', color: '#64748b', marginTop: 8, display: 'block' }}>
          {sub}
        </span>
      )}
    </div>
  );
}
