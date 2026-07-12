export default function StatCard({ icon: Icon, label, value, sub, delta, deltaLabel }) {
  const isPositiveDelta = delta && delta > 0;
  
  return (
    <div className="stat-card-premium">
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
