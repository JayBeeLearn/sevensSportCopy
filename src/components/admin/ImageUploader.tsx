"use client";

import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Loader2, X } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
  label?: string;
}

export default function ImageUploader({ value, onChange, className = "", label = "Upload Image" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      // Cloudinary configuration from user
      const cloudName = "ducytupte";
      const folder = "images";
      
      // Try to use env var for preset, or fallback to standard default 'ml_default'
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";
      
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", folder);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "Upload failed");
      }

      const data = await response.json();
      onChange(data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
      setError((err as Error).message || "Failed to upload image. Please check your Cloudinary upload preset.");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-border bg-card group">
          <img src={value} alt="Uploaded preview" className="w-full h-auto max-h-[300px] object-contain" />
          <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-destructive/90"
            >
              <X className="h-4 w-4" />
              Remove Image
            </button>
          </div>
        </div>
      ) : (
        <div className="relative border-2 border-dashed border-border rounded-xl p-8 hover:bg-accent/50 hover:border-primary/50 transition-colors text-center cursor-pointer flex flex-col items-center justify-center min-h-[150px]">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-3 text-primary">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="font-medium text-sm">Uploading to Cloudinary...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UploadCloud className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{label}</p>
                <p className="text-xs mt-1">Click or drag & drop to upload</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <p className="text-xs font-semibold text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}
