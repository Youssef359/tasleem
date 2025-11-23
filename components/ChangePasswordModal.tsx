import { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';

interface ChangePasswordModalProps {
  onClose: () => void;
  onSave: (currentPassword: string, newPassword: string) => void;
}

export function ChangePasswordModal({ onClose, onSave }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: '#ff4444' };
    if (password.length < 10) return { strength: 50, label: 'Fair', color: '#ffa500' };
    if (password.length < 14) return { strength: 75, label: 'Good', color: '#4ade80' };
    return { strength: 100, label: 'Strong', color: '#22c55e' };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    onSave(currentPassword, newPassword);
  };

  const isFormValid = currentPassword && newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 md:p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[#fafafa]">Change Password</h2>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#fafafa] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div>
            <label htmlFor="current-password" className="block text-[#888] text-sm mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                id="current-password"
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-[#fafafa] focus:border-[#fafafa] focus:outline-none pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#fafafa]"
                aria-label={showCurrent ? 'Hide password' : 'Show password'}
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="new-password" className="block text-[#888] text-sm mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-[#fafafa] focus:border-[#fafafa] focus:outline-none pr-10"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#fafafa]"
                aria-label={showNew ? 'Hide password' : 'Show password'}
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-[#888]">Password strength:</span>
                  <span className="text-xs" style={{ color: passwordStrength.color }}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className="w-full bg-[#1a1a1a] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${passwordStrength.strength}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-[#888] text-sm mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-[#fafafa] focus:border-[#fafafa] focus:outline-none pr-10"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#fafafa]"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-[#ff4444] text-sm bg-[#3a1a1a] border border-[#5a2a2a] rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-transparent border border-[#333] text-[#fafafa] px-6 py-2.5 rounded-lg transition-all duration-200 hover:border-[#555]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className="flex-1 bg-[#fafafa] text-black px-6 py-2.5 rounded-lg transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(250,250,250,0.15)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              Save Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
