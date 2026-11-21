import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { ProfilesView } from './views/ProfilesView';
import { SubscriptionsView } from './views/SubscriptionsView';
import { SettingsView } from './views/SettingsView';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { EReceiptModal } from './components/EReceiptModal';
import { MOCK_TRANSACTIONS } from './data/mockData';
import { adminApi } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [profiles, setProfiles] = useState([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [transactions] = useState(MOCK_TRANSACTIONS);

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modals
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadProfiles = useCallback(async (showNotification = false) => {
    try {
      setIsLoadingProfiles(true);
      setApiError(null);
      const dbProfiles = await adminApi.getProfiles();
      setProfiles(dbProfiles);
      if (showNotification) {
        showToast(`Loaded ${dbProfiles.length} profile(s) from AWS DynamoDB`);
      }
    } catch (err) {
      console.error('[Admin Load Profiles Error]', err);
      setApiError(err.message || 'Could not fetch profiles from backend');
    } finally {
      setIsLoadingProfiles(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  // 1. Approve Profile
  const handleApproveProfile = async (profileId) => {
    try {
      const updated = await adminApi.updateProfileStatus(profileId, 'approve');
      setProfiles((prev) =>
        prev.map((p) => (p.id === profileId ? updated : p))
      );
      if (selectedProfile?.id === profileId) {
        setSelectedProfile(updated);
      }
      showToast('Profile approved & Aadhaar Verified badge granted!');
    } catch (err) {
      showToast(`Failed to approve: ${err.message}`);
    }
  };

  // 2. Reject Profile
  const handleRejectProfile = async (profileId) => {
    const reason = window.prompt(
      'Enter rejection reason (optional):',
      'Incomplete KYC details or unclear photo'
    );
    if (reason === null) return; // Cancelled prompt

    try {
      const updated = await adminApi.updateProfileStatus(profileId, 'reject', reason);
      setProfiles((prev) =>
        prev.map((p) => (p.id === profileId ? updated : p))
      );
      if (selectedProfile?.id === profileId) {
        setSelectedProfile(updated);
      }
      showToast('Profile rejected.');
    } catch (err) {
      showToast(`Failed to reject: ${err.message}`);
    }
  };

  // 3. Suspend Profile
  const handleSuspendProfile = async (profileId) => {
    const confirmed = window.confirm(
      'Are you sure you want to suspend this candidate profile?'
    );
    if (!confirmed) return;

    try {
      const updated = await adminApi.updateProfileStatus(
        profileId,
        'suspend',
        'Suspended by administrator'
      );
      setProfiles((prev) =>
        prev.map((p) => (p.id === profileId ? updated : p))
      );
      if (selectedProfile?.id === profileId) {
        setSelectedProfile(updated);
      }
      showToast('Profile suspended.');
    } catch (err) {
      showToast(`Failed to suspend: ${err.message}`);
    }
  };

  // 4. Delete Profile Permanently
  const handleDeleteProfile = async (profileId) => {
    const target = profiles.find((p) => p.id === profileId);
    const confirmed = window.confirm(
      `Are you sure you want to permanently DELETE "${target?.name || profileId}" from the database? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await adminApi.deleteProfile(profileId);
      setProfiles((prev) => prev.filter((p) => p.id !== profileId));
      if (selectedProfile?.id === profileId) {
        setSelectedProfile(null);
      }
      showToast('Profile permanently deleted from database.');
    } catch (err) {
      showToast(`Failed to delete: ${err.message}`);
    }
  };

  // Create New Profile in DynamoDB
  const handleCreateNewProfile = async () => {
    const name = window.prompt('Enter Candidate Full Name (e.g., Meenakshi Ramanathan):');
    if (!name) return;

    try {
      const created = await adminApi.createProfile({
        name,
        gender: 'bride',
        age: 25,
        maritalStatus: 'never_married',
        religion: 'Hindu',
        caste: 'Pillai',
        subCaste: 'Saiva Pillai',
        nativeDistrict: 'Madurai',
        currentCity: 'Chennai',
        education: 'B.Tech IT',
        occupation: 'Software Engineer',
        employer: 'Infosys',
        annualIncome: '₹ 14 - 16 Lakhs',
        photos: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        ],
        about: `${name} is looking for a caring, well-educated life partner.`,
        status: 'pending',
        isVerified: false,
      });

      setProfiles((prev) => [created, ...prev]);
      showToast(`New profile for ${name} saved to AWS DynamoDB!`);
      setCurrentTab('profiles');
    } catch (err) {
      showToast(`Failed to create profile: ${err.message}`);
    }
  };

  const pendingCount = profiles.filter(
    (p) => p.status === 'pending' || (!p.isVerified && p.status !== 'rejected' && p.status !== 'suspended')
  ).length;

  return (
    <div className="min-h-screen w-full bg-[#F8F9FD] flex">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-[#18181D] text-white text-xs font-bold shadow-xl border border-slate-700 animate-in slide-in-from-top-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Responsive Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        pendingCount={pendingCount}
      />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNewProfileClick={handleCreateNewProfile}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
          {currentTab === 'dashboard' && (
            <DashboardView
              profiles={profiles}
              isLoading={isLoadingProfiles}
              transactions={transactions}
              onVerifyProfile={handleApproveProfile}
              onRejectProfile={handleRejectProfile}
              onViewProfile={setSelectedProfile}
              onViewReceipt={setSelectedTransaction}
              onNavigateTab={setCurrentTab}
              onRefresh={() => loadProfiles(true)}
            />
          )}

          {currentTab === 'profiles' && (
            <ProfilesView
              profiles={profiles}
              isLoading={isLoadingProfiles}
              apiError={apiError}
              searchQuery={searchQuery}
              onApproveProfile={handleApproveProfile}
              onRejectProfile={handleRejectProfile}
              onSuspendProfile={handleSuspendProfile}
              onDeleteProfile={handleDeleteProfile}
              onViewProfile={setSelectedProfile}
              onRefresh={() => loadProfiles(true)}
            />
          )}

          {currentTab === 'subscriptions' && (
            <SubscriptionsView
              transactions={transactions}
              onViewReceipt={setSelectedTransaction}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>

      {/* Candidate Profile Detail Drawer/Modal */}
      <ProfileDetailModal
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onApprove={handleApproveProfile}
        onReject={handleRejectProfile}
        onSuspend={handleSuspendProfile}
        onDelete={handleDeleteProfile}
      />

      {/* Barcode E-Receipt Modal */}
      <EReceiptModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
