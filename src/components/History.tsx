import React, { useState } from "react";
import { Search, Filter, FileText, ArrowRight, CheckCircle, AlertTriangle, Clock, MoreVertical, Download } from "lucide-react";

export const HistoryView = ({ onViewReport }: { onViewReport: () => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const historyData = [
    { id: 1, name: "patient_042_eeg.npy", date: "Feb 11, 2026", duration: "45m 12s", status: "Abnormal", confidence: "92%" },
    { id: 2, name: "patient_039_baseline.npy", date: "Feb 10, 2026", duration: "30m 00s", status: "Normal", confidence: "98%" },
    { id: 3, name: "control_grp_12.npy", date: "Feb 09, 2026", duration: "60m 00s", status: "Pending", confidence: "—" },
    { id: 4, name: "patient_038_sleep.npy", date: "Feb 08, 2026", duration: "8h 15m", status: "Normal", confidence: "95%" },
    { id: 5, name: "patient_035_ictal.npy", date: "Feb 05, 2026", duration: "22m 45s", status: "Abnormal", confidence: "89%" },
    { id: 6, name: "test_calib_001.npy", date: "Feb 01, 2026", duration: "05m 00s", status: "Error", confidence: "—" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Analysis History</h2>
          <p className="text-slate-500 text-sm mt-1">Archive of all uploaded recordings and generated reports.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
             <Download size={16} className="mr-2" /> Export CSV
           </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by file name or patient ID..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]/50 focus:border-[#5FA8D3]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-slate-400 h-4 w-4" />
          <span className="text-sm text-slate-500 font-medium">Filter:</span>
          <select 
            className="bg-slate-50 border border-slate-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:border-[#5FA8D3] text-slate-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Results</option>
            <option value="Normal">Normal</option>
            <option value="Abnormal">Abnormal Detected</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
              <th className="px-6 py-4 font-semibold">File Name</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Confidence</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {historyData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-slate-100 rounded-lg mr-3 text-slate-500">
                      <FileText size={16} />
                    </div>
                    <span className="font-medium text-slate-700">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-500 text-sm">{item.date}</td>
                <td className="px-6 py-4 text-slate-500 text-sm">{item.duration}</td>
                <td className="px-6 py-4">
                  {item.status === "Abnormal" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                      <AlertTriangle size={12} className="mr-1" /> Abnormal
                    </span>
                  )}
                  {item.status === "Normal" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      <CheckCircle size={12} className="mr-1" /> Normal
                    </span>
                  )}
                  {item.status === "Pending" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      <Clock size={12} className="mr-1" /> Processing
                    </span>
                  )}
                  {item.status === "Error" && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                      Failed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                  {item.confidence}
                </td>
                <td className="px-6 py-4 text-right">
                  {item.status !== "Pending" && item.status !== "Error" ? (
                    <button 
                      onClick={onViewReport}
                      className="text-[#5FA8D3] hover:text-[#4a8fb6] font-medium text-sm inline-flex items-center"
                    >
                      View Report <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button className="text-slate-300 cursor-not-allowed">
                      <MoreVertical size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Mock */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <span className="text-xs text-slate-500">Showing 1-6 of 24 results</span>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 text-xs border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 text-xs border border-slate-200 rounded bg-white text-slate-600 hover:border-[#5FA8D3] hover:text-[#5FA8D3]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
