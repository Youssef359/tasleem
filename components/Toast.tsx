import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export function Toast({ message, type }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const bgColor = type === 'success' ? 'bg-[#1a3a1a]' : 'bg-[#3a1a1a]';
  const borderColor = type === 'success' ? 'border-[#2a5a2a]' : 'border-[#5a2a2a]';
  const textColor = type === 'success' ? 'text-[#4ade80]' : 'text-[#ff4444]';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed top-4 right-4 z-50 ${bgColor} border ${borderColor} rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
    >
      <Icon className={`w-5 h-5 ${textColor} flex-shrink-0`} />
      <p className="text-[#fafafa] text-sm">{message}</p>
    </div>
  );
}
