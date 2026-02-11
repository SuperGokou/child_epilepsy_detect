import React from "react";
import { FileText, Download, ShieldCheck, Database, BrainCircuit, Activity } from "lucide-react";

export const ProtocolView = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Analysis Protocol & Methodology</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Understanding how the NeuroDetect AI processes pediatric EEG data to assist in clinical decision making.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Step 1: Data Requirements */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#5FA8D3] text-white flex items-center justify-center font-bold mr-3">1</div>
            <h2 className="text-lg font-bold text-slate-800">Data Requirements & Input</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <p className="text-slate-600 leading-relaxed">
                  The system is optimized for multi-channel pediatric EEG data. To ensure accurate analysis, uploaded files must meet specific criteria.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Database className="w-5 h-5 text-[#5FA8D3] mr-2 mt-0.5" />
                    <span className="text-sm text-slate-600"><strong>Format:</strong> Raw NumPy arrays (.npy) or specific EEG formats converted to .npy.</span>
                  </li>
                  <li className="flex items-start">
                    <Activity className="w-5 h-5 text-[#5FA8D3] mr-2 mt-0.5" />
                    <span className="text-sm text-slate-600"><strong>Sampling Rate:</strong> Minimum 256 Hz recommended.</span>
                  </li>
                  <li className="flex items-start">
                    <ShieldCheck className="w-5 h-5 text-[#5FA8D3] mr-2 mt-0.5" />
                    <span className="text-sm text-slate-600"><strong>Anonymization:</strong> All Patient Health Information (PHI) must be removed prior to upload.</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/3 bg-slate-50 rounded-lg p-4 border border-slate-100 text-xs font-mono text-slate-500">
                <p className="mb-2 font-bold text-slate-700">Expected Array Shape:</p>
                <p>Option A: (Channels, Timepoints)</p>
                <p>Option B: (Timepoints, Channels)</p>
                <br/>
                <p className="mb-2 font-bold text-slate-700">Supported Montages:</p>
                <p>- 10-20 International System</p>
                <p>- Modified Combinatorial</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 2: Processing Pipeline */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#5FA8D3] text-white flex items-center justify-center font-bold mr-3">2</div>
            <h2 className="text-lg font-bold text-slate-800">AI Processing Pipeline</h2>
          </div>
          <div className="p-6">
             <div className="space-y-6">
                <p className="text-slate-600 leading-relaxed">
                  Our proprietary deep learning model utilizes a Convolutional Neural Network (CNN) architecture trained on over 50,000 hours of annotated pediatric EEG data.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-slate-100 rounded-lg text-center bg-slate-50/50">
                    <h4 className="font-bold text-slate-800 mb-2">Preprocessing</h4>
                    <p className="text-xs text-slate-500">Artifact removal (muscle/eye movement) and bandpass filtering (0.5-70Hz).</p>
                  </div>
                  <div className="p-4 border border-[#5FA8D3]/20 rounded-lg text-center bg-[#5FA8D3]/5">
                    <div className="flex justify-center mb-2"><BrainCircuit className="text-[#5FA8D3]" /></div>
                    <h4 className="font-bold text-slate-800 mb-2">Feature Extraction</h4>
                    <p className="text-xs text-slate-500">Time-frequency analysis identifying spike-and-wave discharges.</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-lg text-center bg-slate-50/50">
                    <h4 className="font-bold text-slate-800 mb-2">Classification</h4>
                    <p className="text-xs text-slate-500">Probabilistic scoring of segments as 'Normal', 'Ictal', or 'Interictal'.</p>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* Step 3: Interpretation */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#5FA8D3] text-white flex items-center justify-center font-bold mr-3">3</div>
            <h2 className="text-lg font-bold text-slate-800">Interpretation & Disclaimer</h2>
          </div>
          <div className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                 <ShieldCheck className="w-6 h-6 text-slate-400" />
              </div>
              <div className="space-y-4">
                <p className="text-slate-600 text-sm">
                  The generated report provides a confidence score and highlights regions of interest. It is designed to <span className="font-semibold">augment</span> the workflow of a neurologist, not replace it.
                </p>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg">
                  <p className="text-amber-800 text-sm font-medium">
                    <strong>Important Medical Disclaimer:</strong> This tool is an investigational device. It has not been cleared or approved by the FDA for diagnostic use. All findings must be corroborated by a qualified clinical professional reviewing the raw EEG data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action */}
        <div className="flex justify-center pt-4">
          <button className="flex items-center bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm">
            <Download size={18} className="mr-2" />
            Download Full Clinical Protocol (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};
