import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { ProfilesView } from './views/ProfilesView';
import { SubscriptionsView } from './views/SubscriptionsView';
import { BranchesView } from './views/BranchesView';
import { SettingsView } from './views/SettingsView';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { EReceiptModal } from './components/EReceiptModal';
import { MOCK_PROFILES, MOCK_BRANCHES, MOCK_TRANSACTIONS } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [branches, setBranches] = useState(MOCK_BRANCHES);

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modals
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = msg => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleVerifyProfile = profileId => {
    setProfiles(prev =>
      prev.map(p =>
        p.id === profileId
          ? {
              ...p,
              isVerified: true,
              verificationDocType: 'Aadhaar Card (UIDAI Verified)',
              status: 'active',
            }
          : p
      )
    );
    showToast('Aadhaar Trust Badge awarded successfully!');
  };

  const handleSuspendProfile = profileId => {
    const confirmed = window.confirm(
      'Are you sure you want to suspend this candidate profile for terms violation?'
    );
    if (!confirmed) return;

    setProfiles(prev =>
      prev.map(p =>
        p.id === profileId
          ? {
              ...p,
              isVerified: false,
              status: 'suspended',
            }
          : p
      )
    );
    showToast('Profile suspended.');
  };

  const handleCreateNewProfile = () => {
    const name = window.prompt('Enter Candidate Full Name (e.g., Meenakshi Ramanathan):');
    if (!name) return;

    const newProfile = {
      id: `mm-new-${Date.now()}`,
      matrimonyId: `MM-TN-${Math.floor(2000 + Math.random() * 8000)}`,
      name,
      gender: 'bride',
      age: 25,
      maritalStatus: 'Never Married',
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
      about: `${name} is looking for a caring, well-educated Tamil groom with traditional family roots.`,
      horoscope: {
        rasi: 'Kanni (கன்னி)',
        nakshatram: 'Hastham',
        lagnam: 'Simmam',
        chevvaiDosham: false,
      },
      family: {
        fatherName: 'K. Ramanathan',
        fatherOccupation: 'Business',
        motherName: 'Kalyani',
        motherOccupation: 'Homemaker',
        familyStatus: 'Upper Middle Class',
      },
      isVerified: false,
      verificationDocType: 'Aadhaar e-KYC Pending Upload',
      membershipTier: 'monthly',
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    setProfiles([newProfile, ...profiles]);
    showToast(`New profile for ${name} added!`);
    setCurrentTab('profiles');
  };

  const pendingCount = profiles.filter(p => !p.isVerified).length;

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
              transactions={transactions}
              branches={branches}
              onVerifyProfile={handleVerifyProfile}
              onViewProfile={setSelectedProfile}
              onViewReceipt={setSelectedTransaction}
              onNavigateTab={setCurrentTab}
            />
          )}

          {currentTab === 'profiles' && (
            <ProfilesView
              profiles={profiles}
              searchQuery={searchQuery}
              onVerifyProfile={handleVerifyProfile}
              onSuspendProfile={handleSuspendProfile}
              onViewProfile={setSelectedProfile}
            />
          )}

          {currentTab === 'subscriptions' && (
            <SubscriptionsView
              transactions={transactions}
              onViewReceipt={setSelectedTransaction}
            />
          )}

          {currentTab === 'branches' && (
            <BranchesView branches={branches} />
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
        onVerify={handleVerifyProfile}
        onSuspend={handleSuspendProfile}
      />

      {/* Barcode E-Receipt Modal */}
      <EReceiptModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
