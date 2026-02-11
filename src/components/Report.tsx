import React from 'react';
import { Download, UploadCloud, CheckCircle, AlertTriangle, Info, Calendar, Clock } from 'lucide-react';
import { WaveformChart } from './WaveformChart';

interface ReportViewProps {
  fileName?: string;
  onDownload: () => void;
  onNewUpload: () => void;
}

// Generate mock data
const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 60; i++) {
    const base = Math.sin(i * 0.5) * 10;
    const noise = (Math.random() - 0.5) * 5;
    // Simulate spike at index 20-30
    let spike = 0;
    if (i > 20 && i < 30) {
      spike = (Math.random() - 0.5) * 40;
    }
    data.push({
      time: `00:${i < 10 ? '0' + i : i}`,
      amplitude: base + noise + spike,
    });
  }
  return data;
};

export const ReportView = ({ fileName = "patient_data_001.npy", onDownload, onNewUpload }: ReportViewProps) => {
  const chartData = generateMockData();
  const hasSeizure = true; // Hardcoded for demo

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Analysis Report</h2>
          <div className="flex items-center text-slate-500 text-sm mt-1">
            <span className="font-medium mr-2">{fileName}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center"><Calendar size={14} className="mr-1" /> Feb 11, 2026</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onNewUpload}
            className="text-slate-600 hover:text-slate-800 font-medium text-sm px-4 py-2"
          >
            Upload another file
          </button>
          <button 
            onClick={onDownload}
            className="bg-[#5FA8D3] hover:bg-[#4a8fb6] text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Detection Status */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${hasSeizure ? 'bg-amber-400' : 'bg-green-400'}`}></div>
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Detection Status</h3>
            <div className={`flex items-start ${hasSeizure ? 'text-amber-600' : 'text-green-600'}`}>
              {hasSeizure ? <AlertTriangle size={24} className="mt-1 mr-3 flex-shrink-0" /> : <CheckCircle size={24} className="mt-1 mr-3 flex-shrink-0" />}
              <div>
                <span className="text-xl font-bold block leading-tight">Potential Epileptiform Activity Detected</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              The model identified <span className="font-semibold text-slate-700">3</span> anomalous segments consistent with seizure biomarkers.
            </p>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Model Confidence</h3>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-slate-800">92%</span>
              <span className="ml-2 text-sm text-slate-500">accuracy estimate</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-[#5FA8D3] h-full rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>

        {/* Recording Details */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
           <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Recording Metrics</h3>
            <div className="space-y-3 mt-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center"><Clock size={14} className="mr-2"/> Duration</span>
                <span className="font-medium text-slate-700">45 min 12 sec</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center"><Info size={14} className="mr-2"/> Channels</span>
                <span className="font-medium text-slate-700">19 (10-20 System)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 flex items-center"><AlertTriangle size={14} className="mr-2"/> Events</span>
                <span className="font-medium text-slate-700">3 Detected</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Signal Analysis Visualization</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#5FA8D3] mr-2"></span>
              <span className="text-slate-600">EEG Signal</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-sm bg-amber-100 border border-amber-200 mr-2"></span>
              <span className="text-slate-600">Detected Anomaly</span>
            </div>
          </div>
        </div>
        
        <WaveformChart 
          data={chartData} 
          seizureIntervals={[{ start: '00:20', end: '00:30' }]}
        />
        
        <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm text-slate-500 flex items-start">
          <Info size={16} className="mt-0.5 mr-2 flex-shrink-0 text-[#5FA8D3]" />
          <p>
            The highlighted region (00:20 - 00:30) indicates a high-probability epileptiform discharge. 
            Review raw signal at high resolution for clinical verification.
          </p>
        </div>
      </div>
    </div>
  );
};
