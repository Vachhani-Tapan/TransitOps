import { 
  CheckCircle2, Navigation, Wrench, Ban, FileText, 
  XCircle, UserCheck, UserX, CircleDot 
} from 'lucide-react';

const statusConfig = {
  // Uppercase variations
  'AVAILABLE': { icon: CheckCircle2, bg: '#dcfce7', color: '#166534', text: 'Available' },
  'ON_TRIP': { icon: Navigation, bg: '#dbeafe', color: '#1e40af', text: 'On Trip' },
  'IN_SHOP': { icon: Wrench, bg: '#fee2e2', color: '#991b1b', text: 'In Shop' },
  'RETIRED': { icon: Ban, bg: '#f1f5f9', color: '#475569', text: 'Retired' },
  'DRAFT': { icon: FileText, bg: '#fef3c7', color: '#92400e', text: 'Draft' },
  'DISPATCHED': { icon: Navigation, bg: '#ffedd5', color: '#c2410c', text: 'Dispatched' },
  'COMPLETED': { icon: CheckCircle2, bg: '#dcfce7', color: '#166534', text: 'Completed' },
  'CANCELLED': { icon: XCircle, bg: '#fee2e2', color: '#991b1b', text: 'Cancelled' },
  'ON_DUTY': { icon: UserCheck, bg: '#dcfce7', color: '#166534', text: 'On Duty' },
  'OFF_DUTY': { icon: UserX, bg: '#f1f5f9', color: '#475569', text: 'Off Duty' },
  'SUSPENDED': { icon: Ban, bg: '#fee2e2', color: '#991b1b', text: 'Suspended' },
  
  // Mixed case fallback
  'Available': { icon: CheckCircle2, bg: '#dcfce7', color: '#166534', text: 'Available' },
  'On Trip': { icon: Navigation, bg: '#dbeafe', color: '#1e40af', text: 'On Trip' },
  'In Shop': { icon: Wrench, bg: '#fee2e2', color: '#991b1b', text: 'In Shop' },
  'Retired': { icon: Ban, bg: '#f1f5f9', color: '#475569', text: 'Retired' },
  'Dispatched': { icon: Navigation, bg: '#ffedd5', color: '#c2410c', text: 'Dispatched' },
  'Completed': { icon: CheckCircle2, bg: '#dcfce7', color: '#166534', text: 'Completed' },
  'Cancelled': { icon: XCircle, bg: '#fee2e2', color: '#991b1b', text: 'Cancelled' }
};

export default function StatusChip({ status }) {
  const normStatus = String(status || '').toUpperCase();
  const config = statusConfig[normStatus] || statusConfig[status] || { icon: CircleDot, bg: '#f1f5f9', color: '#475569', text: status };
  const Icon = config.icon;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 8px',
      borderRadius: 12,
      fontSize: '0.75rem',
      fontWeight: 600,
      background: config.bg,
      color: config.color,
      border: `1px solid rgba(0, 0, 0, 0.05)`,
      whiteSpace: 'nowrap'
    }}>
      <Icon size={12} />
      <span>{config.text}</span>
    </span>
  );
}
