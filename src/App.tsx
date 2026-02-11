import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { UploadView } from './components/Upload';
import { ReportView } from './components/Report';
import { HistoryView } from './components/History';
import { SettingsView } from './components/Settings';
import { ProtocolView } from './components/Protocol';
import { Toaster, toast } from 'sonner';

type ViewState = 'dashboard' | 'upload' | 'report' | 'history' | 'settings' | 'protocol';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [lastUploadedFile, setLastUploadedFile] = useState<File | null>(null);

  const handleUploadComplete = (file: File) => {
    setLastUploadedFile(file);
    toast.success("Analysis complete!");
    setCurrentView('report');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            onStartAnalysis={() => setCurrentView('upload')} 
            onViewReport={() => setCurrentView('report')}
          />
        );
      case 'upload':
        return (
          <UploadView 
            onUploadComplete={handleUploadComplete} 
          />
        );
      case 'report':
        return (
          <ReportView 
            fileName={lastUploadedFile?.name || "patient_data_001.npy"}
            onDownload={() => toast.success("Downloading PDF report...")}
            onNewUpload={() => setCurrentView('upload')}
          />
        );
      case 'history':
        return (
          <HistoryView onViewReport={() => setCurrentView('report')} />
        );
      case 'settings':
        return (
          <SettingsView />
        );
      case 'protocol':
        return (
          <ProtocolView />
        );
      default:
        return <Dashboard onStartAnalysis={() => setCurrentView('upload')} onViewReport={() => setCurrentView('report')} />;
    }
  };

  return (
    <>
      <Layout activeTab={currentView} setActiveTab={(tab) => setCurrentView(tab as ViewState)}>
        {renderContent()}
      </Layout>
      <Toaster position="top-right" />
    </>
  );
}
