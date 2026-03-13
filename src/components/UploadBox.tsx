"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileImage, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export function UploadBox({ onAnalyze }: { onAnalyze: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const clearFile = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  const handleAnalyze = () => {
    if (file) {
      onAnalyze(file);
    }
  };

  return (
    <Card className="p-1 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/20">
      <div className="bg-card w-full rounded-lg p-6 flex flex-col items-center">
        {!file ? (
          <div
            {...getRootProps()}
            className={`w-full max-w-md mx-auto aspect-video border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            } ${isDragReject ? "border-destructive bg-destructive/5" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            {isDragActive ? (
              <p className="text-lg font-medium">Drop the image here...</p>
            ) : (
              <div className="text-center space-y-1">
                <p className="text-lg font-medium">Drag & drop your image here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-4">Supports JPG, PNG (Max 5MB)</p>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-black/50 flex items-center justify-center">
              {preview && (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-80 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/50">
              <FileImage className="w-5 h-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            <Button onClick={handleAnalyze} className="w-full" size="lg">
              Analyze Image
            </Button>
          </div>
        )}

        {isDragReject && (
          <div className="flex items-center gap-2 mt-4 text-sm text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span>File type not supported. Please upload a JPG or PNG.</span>
          </div>
        )}
      </div>
    </Card>
  );
}
