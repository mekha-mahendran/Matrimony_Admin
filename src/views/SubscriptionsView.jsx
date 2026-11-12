import React, { useState } from 'react';
import {
  CreditCard,
  FileText,
  DollarSign,
  Crown,
  CheckCircle,
  Download,
  Calendar,
  Search,
  ExternalLink,
} from 'lucide-react';

export const SubscriptionsView = ({ transactions, onViewReceipt }) => {
  const [filterMode, setFilterMode] = useState('all');

  const filteredTxns = transactions.filter(t => {
    if (filterMode === 'all') return true;
    return t.planPeriod.toLowerCase() === filterMode.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-[#18181D] tracking-tight">
          Subscriptions & E-Receipts Ledger
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Real-time transaction tracking across Stripe, PayPal, Apple Pay, and Google Pay
        </p>
      </div>

      {/* Plan Tier Pricing Cards (Matches Mobile "Choose Your Plan" Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Free Plan */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="bg-slate-100 py-3.5 px-4 text-center">
            <h3 className="text-lg font-extrabold text-slate-800">Free Tier</h3>
            <p className="text-[11px] text-slate-500">2,030 Active Candidates</p>
          </div>
          <div className="p-4 space-y-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Basic profile creation & browsing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Limited 5 daily match recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Standard messaging with reciprocal matches</span>
            </div>
          </div>
        </div>

        {/* Monthly Pro Plan ($9.99/mo) */}
        <div className="bg-white border-2 border-[#6D53F5] rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-[#6D53F5] text-white py-3.5 px-4 text-center">
            <div className="text-xl font-extrabold">$9.99 <span className="text-xs font-normal opacity-80">/month</span></div>
            <p className="text-[11px] text-white/80">Pro Monthly (280 Active)</p>
          </div>
          <div className="p-4 space-y-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Unlimited daily matches & instant chats</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Enhanced 3x profile discoverability</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Direct verified contact number unlocks</span>
            </div>
          </div>
        </div>

        {/* Yearly VIP Plan ($69.99/yr) */}
        <div className="bg-white border-2 border-[#6D53F5] rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-[#6D53F5] text-white py-3.5 px-4 text-center">
            <div className="text-xl font-extrabold">$69.99 <span className="text-xs font-normal opacity-80">/Year</span></div>
            <p className="text-[11px] text-white/80">VIP Kalyanam (140 Active)</p>
          </div>
          <div className="p-4 space-y-2 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>All Monthly Pro features + VIP Crown badge</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Dedicated relationship manager consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6D53F5]">✓</span>
              <span>Top search placement & verified Porutham report</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-[#F0F0F5] rounded-3xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#F0F0F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#18181D]">All Payment Receipts</h3>
            <p className="text-xs text-slate-500">Official digital receipts with transaction barcodes</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'all' ? 'bg-white text-[#6D53F5] shadow-xs' : 'text-slate-500'
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setFilterMode('monthly')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'monthly' ? 'bg-white text-[#6D53F5] shadow-xs' : 'text-slate-500'
              }`}
            >
              Monthly ($9.99)
            </button>
            <button
              onClick={() => setFilterMode('yearly')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterMode === 'yearly' ? 'bg-white text-[#6D53F5] shadow-xs' : 'text-slate-500'
              }`}
            >
              Yearly ($69.99)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9FF] border-b border-[#F0F0F5] text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4">Transaction Code</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Plan & Validity</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">E-Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F5]">
              {filteredTxns.map(t => (
                <tr key={t.id} className="hover:bg-[#FAF9FF] transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-[#6D53F5]">
                    {t.id}
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-bold text-[#18181D]">{t.userName}</div>
                    <div className="text-slate-400 font-mono text-[11px]">{t.phone}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{t.planName}</div>
                    <div className="text-slate-400 text-[10px]">{t.purchaseDate}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {t.paymentMode}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-extrabold text-[#18181D]">
                    {t.total}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px]">
                      {t.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onViewReceipt(t)}
                      className="px-3 py-1.5 rounded-xl bg-[#6D53F5] hover:bg-[#583BD9] text-white font-bold flex items-center gap-1.5 shadow-xs ml-auto"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

