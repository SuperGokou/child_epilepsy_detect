import React from "react";
import { PlusCircle, Clock, CheckCircle, AlertTriangle, FileText, ArrowRight } from "lucide-react";

interface DashboardProps {
  onStartAnalysis: () => void;
  onViewReport: () => void;
  onViewHistory?: () => void;
  onViewProtocol?: () => void;
}

export const Dashboard = ({ onStartAnalysis, onViewReport, onViewHistory, onViewProtocol }: DashboardProps) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl mb-8 md:mb-0">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome back, Dr. Gao
          </h1>
          <p className="text-slate-500 text-lg mb-6">
            Rapidly detect seizure biomarkers from raw NumPy data files. Our AI model assists in identifying subtle epileptiform activity in pediatric EEG recordings.
          </p>
          <div className="flex space-x-4">
            <button
              onClick={onStartAnalysis}
              className="bg-[#5FA8D3] hover:bg-[#4a8fb6] text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors flex items-center group"
            >
              <PlusCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start New Analysis
            </button>
            <button 
              onClick={onViewProtocol}
              className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Protocol
            </button>
          </div>
        </div>
        <div className="hidden md:block relative w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1725784014195-80d35ef7c0a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwc2t5JTIwYmx1ZSUyMGJhY2tncm91bmQlMjBtaW5pbWFsfGVufDF8fHx8MTc3MDc5MTg5M3ww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Brain Analysis Abstract" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <ActivityIcon className="text-[#5FA8D3] w-24 h-24 drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center">
            <Clock className="mr-2 text-slate-400 h-5 w-5" />
            Recent Uploads
          </h2>
          <button onClick={onViewHistory} className="text-sm text-[#5FA8D3] hover:underline font-medium">View All History</button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">File Name</th>
                <th className="px-6 py-4 font-semibold">Date Uploaded</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Result Summary</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="text-slate-400 mr-3 h-5 w-5" />
                    <span className="font-medium text-slate-700">patient_042_eeg.npy</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">Feb 11, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Processed
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-amber-600 font-medium text-sm">
                    <AlertTriangle className="w-4 h-4 mr-1.5" />
                    Potential Activity
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button onClick={onViewReport} className="text-[#5FA8D3] hover:text-[#4a8fb6] font-medium text-sm flex items-center">
                    View Report <ArrowRight className="ml-1 w-3 h-3" />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="text-slate-400 mr-3 h-5 w-5" />
                    <span className="font-medium text-slate-700">patient_039_baseline.npy</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">Feb 10, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Processed
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-slate-500 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1.5 text-green-500" />
                    Normal Baseline
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="text-[#5FA8D3] hover:text-[#4a8fb6] font-medium text-sm flex items-center">
                    View Report <ArrowRight className="ml-1 w-3 h-3" />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FileText className="text-slate-400 mr-3 h-5 w-5" />
                    <span className="font-medium text-slate-700">control_grp_12.npy</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500">Feb 09, 2026</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-slate-400 text-sm">
                    —
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button disabled className="text-slate-300 font-medium text-sm flex items-center cursor-not-allowed">
                    Processing...
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
