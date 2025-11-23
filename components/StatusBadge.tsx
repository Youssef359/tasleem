type Status = 'Created' | 'Payment Verifying' | 'In Progress' | 'In Review' | 'Completed';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    'Created': {
      label: 'Created',
      className: 'bg-black text-gray-300 border border-gray-700'
    },
    'Payment Verifying': {
      label: 'Payment Verifying',
      className: 'bg-black text-blue-400 border border-blue-900'
    },
    'In Progress': {
      label: 'In Progress',
      className: 'bg-black text-green-400 border border-green-900'
    },
    'In Review': {
      label: 'In Review',
      className: 'bg-black text-orange-400 border border-orange-900'
    },
    'Completed': {
      label: 'Completed',
      className: 'bg-black text-emerald-400 border border-emerald-900'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}