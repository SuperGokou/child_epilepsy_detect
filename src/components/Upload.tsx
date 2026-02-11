import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UploadProps {
  onUploadComplete: (file: File) => void;
}

export function UploadView({ onUploadComplete }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      // Simulate checking extension manually just in case, though dropzone handles it
      if (!selectedFile.name.endsWith('.npy')) {
        setError("Invalid file format. Please upload .npy only.");
        return;
      }
      setFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.npy'],
      'application/x-numpy-data': ['.npy'] 
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onUploadComplete(file);
        }, 500);
      }
    }, 150);
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Upload EEG Data</h2>
        <p className="text-slate-500">
          Drag and drop your raw NumPy (.npy) file below to begin analysis.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        {!file ? (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
              ${isDragActive ? "border-[#5FA8D3] bg-[#5FA8D3]/5" : "border-slate-300 hover:border-[#5FA8D3] hover:bg-slate-50"}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-[#5FA8D3]">
                <UploadCloud size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-slate-700">
                  {isDragActive ? "Drop the file here" : "Drag & drop file here"}
                </p>
                <p className="text-sm text-slate-500">or click to browse computer</p>
              </div>
              <div className="pt-4 text-xs text-slate-400">
                <p>Accepted format: .npy (NumPy array) only</p>
                <p>Max file size: 500MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#5FA8D3]/10 rounded-lg flex items-center justify-center text-[#5FA8D3]">
                  <File size={24} />
                </div>
                <div>
                  <p className="font-medium text-slate-700 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              {!isUploading && (
                <button 
                  onClick={removeFile}
                  className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {isUploading ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span>{uploadProgress < 100 ? "Uploading & Analyzing..." : "Processing complete!"}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-[#5FA8D3]"
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleUpload}
                  className="bg-[#5FA8D3] hover:bg-[#4a8fb6] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                >
                  Start Analysis
                </button>
              </div>
            )}
          </div>
        )}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 p-4 bg-red-50 text-red-700 text-sm rounded-lg flex items-center border border-red-100"
            >
              <X className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
