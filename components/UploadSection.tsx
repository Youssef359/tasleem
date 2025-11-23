'use client'
import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Video, FileArchive } from 'lucide-react';

interface UploadSectionProps {
  title: string;
  type: 'images' | 'video' | 'secure';
  hideLabel?: boolean;
}

export function UploadSection({ title, type, hideLabel }: UploadSectionProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (type === 'images') {
        setFiles([...files, ...newFiles]);
      } else {
        setFiles([newFiles[0]]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      if (type === 'images') {
        setFiles([...files, ...newFiles]);
      } else {
        setFiles([newFiles[0]]);
      }
    }
  };

  const getIcon = () => {
    if (type === 'images') return <ImageIcon className="w-10 h-10" />;
    if (type === 'video') return <Video className="w-10 h-10" />;
    return <FileArchive className="w-10 h-10" />;
  };

  const getAcceptType = () => {
    if (type === 'images') return 'image/*';
    if (type === 'video') return 'video/*';
    return '.zip,.rar,.7z';
  };

  const getUploadText = () => {
    if (type === 'images') return 'Click to upload images';
    if (type === 'video') return 'Click to upload video';
    return 'Click to upload .ZIP file';
  };

  const getFileTypes = () => {
    if (type === 'images') return 'PNG, JPG, GIF up to 10MB each';
    if (type === 'video') return 'MP4, WebM up to 100MB';
    return 'ZIP/RAR encryption and zones';
  };

  return (
    <div>
      {!hideLabel && title && (
        <label className="block text-[#fafafa] mb-2">{title}</label>
      )}

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed ${
          isDragging ? 'border-[#fafafa] bg-[#fafafa] bg-opacity-5' : 'border-[#dedede] border-opacity-30'
        } rounded-md py-12 text-center transition-all cursor-pointer hover:border-opacity-50`}
      >
        <input
          type="file"
          id={`upload-${type}`}
          multiple={type === 'images'}
          accept={getAcceptType()}
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor={`upload-${type}`}
          className="cursor-pointer flex flex-col items-center gap-3"
        >
          <div className="text-[#dedede] opacity-40">
            {getIcon()}
          </div>
          <div>
            <div className="text-[#fafafa] mb-1">{getUploadText()}</div>
            <div className="text-[#dedede] opacity-50">{getFileTypes()}</div>
          </div>
        </label>
      </div>

      {/* File Preview */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#dedede] bg-opacity-5 border border-[#dedede] border-opacity-30 rounded-md px-4 py-2.5"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="text-[#dedede] opacity-60">
                  {type === 'images' && <ImageIcon className="w-4 h-4" />}
                  {type === 'video' && <Video className="w-4 h-4" />}
                  {type === 'secure' && <FileArchive className="w-4 h-4" />}
                </div>
                <span className="text-[#fafafa] truncate">{file.name}</span>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-[#dedede] hover:text-[#fafafa] transition-colors ml-2"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}