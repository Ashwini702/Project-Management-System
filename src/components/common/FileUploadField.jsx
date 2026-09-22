// src/components/common/FileUploadField.jsx
import React, { useMemo, useRef, useState } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';

const FileUploadField = ({
  title = 'Upload File',
  hint = 'Click to browse',
  accept = '*/*',
  maxSizeMB = 5,
  name,
  className = '',
  onFileSelect
}) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const previewUrl = useMemo(() => {
    if (!file || !file.type?.startsWith('image/')) return '';
    return URL.createObjectURL(file);
  }, [file]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxBytes) {
      setFile(null);
      setError(`File must be ${maxSizeMB} MB or smaller`);
      event.target.value = '';
      onFileSelect?.(null);
      return;
    }

    setFile(selectedFile);
    setError('');
    onFileSelect?.(selectedFile);
  };

  const clearFile = (event) => {
    event.stopPropagation();
    setFile(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
    onFileSelect?.(null);
  };

  return (
    <div className={`file-upload-field ${className}`.trim()}>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        className="file-upload-input"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className={`document-upload-area file-upload-area ${file ? 'has-file' : ''}`}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <img className="file-upload-preview" src={previewUrl} alt={file.name} />
        ) : file ? (
          <FiFile className="upload-icon-large" />
        ) : (
          <FiUpload className="upload-icon-large" />
        )}

        <p>{file ? file.name : title}</p>
        <span>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB selected` : hint}</span>

        {file && (
          <span className="file-upload-clear" onClick={clearFile} role="button" tabIndex={0}>
            <FiX /> Remove
          </span>
        )}
      </button>

      {error && <div className="file-upload-error">{error}</div>}
    </div>
  );
};

export default FileUploadField;