import React from "react";
import { Activity, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'upload', label: 'New Analysis' },
    { id: 'history', label: 'History' },
    { id: 'protocol', label: 'Protocol' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab("dashboard")}>
              <div className="w-8 h-8 rounded-lg bg-[#5FA8D3] flex items-center justify-center mr-3 shadow-sm">
                <Activity className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 leading-none">NeuroDetect<span className="text-[#5FA8D3]">.ai</span></h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Pediatric EEG Analysis</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === item.id || (activeTab === 'report' && item.id === 'upload')
                      ? "text-[#5FA8D3] border-[#5FA8D3]" 
                      : "text-slate-500 hover:text-slate-800 border-transparent hover:border-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium text-slate-700">Dr. Vivian Gao</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-500 hover:text-slate-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                      activeTab === item.id 
                      ? "bg-slate-50 text-[#5FA8D3]" 
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#5FA8D3]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-slate-500">© 2026 NeuroDetect AI. All rights reserved.</p>
            </div>
            <div className="text-center md:text-right max-w-xl">
              <p className="text-xs text-slate-400 italic">
                DISCLAIMER: This tool is designed to assist research and is not a replacement for clinical diagnosis by a qualified neurologist.
                Analysis results should always be verified by a medical professional.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
