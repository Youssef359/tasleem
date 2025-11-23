import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteAccountModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteAccountModal({ onClose, onConfirm }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onConfirm();
  };

  const isConfirmValid = confirmText === 'DELETE';

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-[#111111] border border-[#331111] rounded-xl p-6 md:p-8 max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-[#ff4444]" />
            <h2 className="text-[#ff4444]">Are you absolutely sure?</h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#888] hover:text-[#fafafa] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-[#fafafa] leading-relaxed">
            This action <span className="text-[#ff4444]">cannot be undone</span>. This will permanently delete your account and remove all your data from our servers.
          </p>

          <div className="bg-[#1a0a0a] border border-[#2a1111] rounded-lg p-4">
            <p className="text-[#888] text-sm leading-relaxed">
              • All your personal information will be deleted
              <br />
              • Your account balance will be lost
              <br />
              • You will lose access to all features
              <br />
              • This action is irreversible
            </p>
          </div>

          <div>
            <label htmlFor="confirm-delete" className="block text-[#fafafa] text-sm mb-2">
              Type <span className="text-[#ff4444] font-mono">DELETE</span> to confirm:
            </label>
            <input
              id="confirm-delete"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full bg-black border border-[#333] rounded-lg px-4 py-2.5 text-[#fafafa] focus:border-[#ff4444] focus:outline-none font-mono"
              placeholder="DELETE"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-transparent border border-[#333] text-[#fafafa] px-6 py-2.5 rounded-lg transition-all duration-200 hover:border-[#555] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmValid || isLoading}
            className="flex-1 bg-transparent border border-[#ff4444] text-[#ff4444] px-6 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#ff4444] hover:text-black hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-transparent disabled:hover:text-[#ff4444] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#ff4444] border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Forever'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
