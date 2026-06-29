"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

interface CoverImageInputProps {
  defaultValue?: string;
}

export default function CoverImageInput({ defaultValue = "" }: CoverImageInputProps) {
  const [url, setUrl] = useState(defaultValue);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Cover Image</label>
      <ImageUploader 
        value={url} 
        onChange={setUrl} 
        label="Upload Cover Image"
      />
      <input type="hidden" name="cover_image_url" value={url} />
    </div>
  );
}
