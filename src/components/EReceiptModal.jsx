import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';

export const EReceiptModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F0EEFE] flex items-center justify-center text-[#6D53F5]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#18181D]">E-Receipt</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barcode Graphic */}
        <div className="py-5 flex justify-center">
          <svg className="w-64 h-16" viewBox="0 0 250 60">
            <rect x="0" y="0" width="3" height="60" fill="#18181D"/>
            <rect x="6" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="10" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="18" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="23" y="0" width="5" height="60" fill="#18181D"/>
            <rect x="32" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="36" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="44" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="49" y="0" width="6" height="60" fill="#18181D"/>
            <rect x="58" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="63" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="67" y="0" width="5" height="60" fill="#18181D"/>
            <rect x="75" y="0" width="3" height="60" fill="#18181D"/>
            <rect x="81" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="85" y="0" width="6" height="60" fill="#18181D"/>
            <rect x="94" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="99" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="106" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="111" y="0" width="5" height="60" fill="#18181D"/>
            <rect x="119" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="123" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="130" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="135" y="0" width="6" height="60" fill="#18181D"/>
            <rect x="144" y="0" width="3" height="60" fill="#18181D"/>
            <rect x="150" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="154" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="161" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="166" y="0" width="5" height="60" fill="#18181D"/>
            <rect x="174" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="178" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="185" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="190" y="0" width="6" height="60" fill="#18181D"/>
            <rect x="199" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="204" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="211" y="0" width="1" height="60" fill="#18181D"/>
            <rect x="215" y="0" width="5" height="60" fill="#18181D"/>
            <rect x="223" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="228" y="0" width="4" height="60" fill="#18181D"/>
            <rect x="235" y="0" width="2" height="60" fill="#18181D"/>
            <rect x="240" y="0" width="3" height="60" fill="#18181D"/>
          </svg>
        </div>

        {/* Breakdown Items */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Plan Details</span>
            <span className="text-slate-900 font-bold">{transaction.planPeriod}</span>
          </div>

          <div className="h-1"></div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Purchase Date</span>
            <span className="text-slate-900 font-semibold">{transaction.purchaseDate}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Expiry Date</span>
            <span className="text-slate-900 font-semibold">{transaction.expiryDate}</span>
          </div>

          <div className="h-1"></div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Amount</span>
            <span className="text-slate-900 font-bold">{transaction.amount}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Tax & Fees</span>
            <span className="text-slate-900 font-bold">{transaction.tax}</span>
          </div>

          {/* Dashed Line */}
          <div className="border-b border-dashed border-slate-300 my-2"></div>

          <div className="flex justify-between py-1 text-sm">
            <span className="text-slate-900 font-bold">Total</span>
            <span className="text-slate-900 font-extrabold">{transaction.total}</span>
          </div>

          <div className="h-1"></div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Name</span>
            <span className="text-slate-900 font-bold">{transaction.userName}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Phone Number</span>
            <span className="text-slate-900 font-bold">{transaction.phone}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Payment Mode</span>
            <span className="text-slate-900 font-bold">{transaction.paymentMode}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500 font-medium">Transaction ID</span>
            <span className="text-slate-900 font-bold font-mono">{transaction.receiptCode || transaction.id}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-full bg-[#6D53F5] text-white text-xs font-bold shadow-md shadow-[#6D53F5]/30 hover:bg-[#583BD9] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download E-Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};

