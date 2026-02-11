import React, { useState } from "react";
import { User, Bell, Shield, Sliders, Mail, Save, ToggleLeft, ToggleRight } from "lucide-react";

export const SettingsView = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [autoProcess, setAutoProcess] = useState(true);
  const [sensitivity, setSensitivity] = useState(75);

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your account preferences and analysis configurations.</p>
      </div>

      <div className="grid gap-8">
        {/* Profile Section */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="p-3 bg-slate-100 rounded-full text-slate-600">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Profile Information</h3>
              <p className="text-sm text-slate-500">Update your personal details and credentials.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input 
                type="text" 
                defaultValue="Dr. Vivian Gao"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]/50 focus:border-[#5FA8D3]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input 
                type="email" 
                defaultValue="vivian.gao@hospital.med"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]/50 focus:border-[#5FA8D3]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Medical License ID</label>
              <input 
                type="text" 
                defaultValue="MD-9928-XA"
                readOnly
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Department</label>
              <input 
                type="text" 
                defaultValue="Pediatric Neurology"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5FA8D3]/50 focus:border-[#5FA8D3]"
              />
            </div>
          </div>
        </section>

        {/* Analysis Configuration */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="p-3 bg-slate-100 rounded-full text-slate-600">
              <Sliders size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Analysis Parameters</h3>
              <p className="text-sm text-slate-500">Adjust the sensitivity of the detection algorithms.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-700">Detection Sensitivity Threshold</label>
                <span className="text-sm font-bold text-[#5FA8D3]">{sensitivity}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="99" 
                value={sensitivity} 
                onChange={(e) => setSensitivity(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5FA8D3]"
              />
              <p className="text-xs text-slate-500 mt-2">
                Higher sensitivity increases the likelihood of detecting subtle events but may increase false positives.
                Standard clinical recommendation is 75%.
              </p>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-slate-50">
              <div>
                <h4 className="text-sm font-medium text-slate-800">Automatic Processing</h4>
                <p className="text-xs text-slate-500">Automatically start analysis upon upload completion.</p>
              </div>
              <button 
                onClick={() => setAutoProcess(!autoProcess)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoProcess ? 'bg-[#5FA8D3]' : 'bg-slate-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoProcess ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="p-3 bg-slate-100 rounded-full text-slate-600">
              <Bell size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
              <p className="text-sm text-slate-500">Control how and when you receive alerts.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-slate-400" />
                <div>
                  <h4 className="text-sm font-medium text-slate-800">Email Alerts</h4>
                  <p className="text-xs text-slate-500">Receive an email when analysis is complete.</p>
                </div>
              </div>
              <button 
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifs ? 'bg-[#5FA8D3]' : 'bg-slate-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifs ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center bg-[#5FA8D3] hover:bg-[#4a8fb6] text-white px-8 py-3 rounded-lg font-medium shadow-sm transition-colors">
            <Save size={18} className="mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
