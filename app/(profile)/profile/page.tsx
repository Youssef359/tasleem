'use client'
import { useState } from 'react';
import { ProfilePicture } from '@/components/ProfilePicture';
import { EditableField } from '@/components/EditableField';
import { InfoCard } from '@/components/InfoCard';
import { ChangePasswordModal } from '@/components/ChangePasswordModal';
import { DeleteAccountModal } from '@/components/DeleteAccountModal';
import { Toast } from '@/components/Toast';
import { AlertTriangle } from 'lucide-react';

export default function App() {
  const [userData, setUserData] = useState({
    name: 'Alexandra Morgan',
    email: 'alexandra.morgan@example.com',
    accountType: 'Trader',
    balance: 24567.89,
    profilePicture: null as string | null,
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleUpdateName = (newName: string) => {
    setUserData({ ...userData, name: newName });
    showToast('Name updated successfully', 'success');
  };

  const handleUpdateEmail = (newEmail: string) => {
    setUserData({ ...userData, email: newEmail });
    showToast('Email updated successfully', 'success');
  };

  const handleProfilePictureChange = (imageUrl: string) => {
    setUserData({ ...userData, profilePicture: imageUrl });
    showToast('Profile picture updated', 'success');
  };

  const handleChangePassword = (currentPassword: string, newPassword: string) => {
    console.log('Password change:', { currentPassword, newPassword });
    setShowChangePassword(false);
    showToast('Password changed successfully', 'success');
  };

  const handleDeleteAccount = () => {
    console.log('Account deleted');
    setShowDeleteAccount(false);
    showToast('Account deleted. Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-16 lg:px-16 py-10 md:py-20">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-[#fafafa] mb-8 md:mb-12">Profile</h1>

          <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <ProfilePicture
                imageUrl={userData.profilePicture}
                userName={userData.name}
                onImageChange={handleProfilePictureChange}
              />
              
              <div className="flex-1 flex flex-col justify-center w-full sm:w-auto text-center sm:text-left">
                <EditableField
                  value={userData.name}
                  onSave={handleUpdateName}
                  className="text-white mb-2"
                  inputClassName="text-2xl"
                />
                <EditableField
                  value={userData.email}
                  onSave={handleUpdateEmail}
                  className="text-[#888]"
                  inputClassName="text-base"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <InfoCard label="Account Type" value={userData.accountType} isBadge />
            <InfoCard 
              label="Account Balance" 
              value={`$${userData.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              isBalance
            />
          </div>

          <div className="mt-8 md:mt-12">
            <h2 className="text-[#fafafa] mb-6">Security</h2>
            
            <div className="bg-[#111111] border border-[#1a1a1a] rounded-xl p-6 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[#fafafa]">Change Password</div>
                <p className="text-[#888] text-sm leading-relaxed">
                  Update your password to keep your account secure
                </p>
              </div>
              <button
                onClick={() => setShowChangePassword(true)}
                className="bg-[#fafafa] text-black px-6 py-2.5 rounded-lg transition-all duration-200 hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(250,250,250,0.15)] active:translate-y-0 whitespace-nowrap w-full sm:w-auto"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="mt-12 border border-[#331111] rounded-xl p-6 md:p-8 bg-gradient-to-br from-[#0a0000] to-[#000000]">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#ff4444]" />
              <h2 className="text-[#ff4444]">Danger Zone</h2>
            </div>
            
            <div className="border border-[#2a1111] rounded-lg p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-[#fafafa]">Delete Account</div>
                <p className="text-[#888] text-sm leading-relaxed max-w-[500px]">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteAccount(true)}
                className="bg-transparent text-[#ff4444] border border-[#ff4444] px-6 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#ff4444] hover:text-black hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap w-full sm:w-auto"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {showChangePassword && (
        <ChangePasswordModal
          onClose={() => setShowChangePassword(false)}
          onSave={handleChangePassword}
        />
      )}

      {showDeleteAccount && (
        <DeleteAccountModal
          onClose={() => setShowDeleteAccount(false)}
          onConfirm={handleDeleteAccount}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}