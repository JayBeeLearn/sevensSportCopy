"use client";

import { useRef, useEffect, useState } from "react";
import { Link2, Bold, Italic, Check, X } from "lucide-react";

interface InlineRichTextProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export default function InlineRichText({ value, onChange, placeholder, className = "" }: InlineRichTextProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const savedRangeRef = useRef<Range | null>(null);

  // Initialize value only once to prevent cursor jumping
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  const handleBlur = () => {
    // Don't trigger blur update if we're just clicking the link modal
    if (showLinkModal) return;
    
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleFormat = (command: string, e: React.MouseEvent) => {
    e.preventDefault(); // Keep focus on the editor
    if (command === "createLink") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        savedRangeRef.current = selection.getRangeAt(0).cloneRange();
      }
      setLinkUrl("");
      setShowLinkModal(true);
    } else {
      document.execCommand(command, false);
    }
  };

  const applyLink = () => {
    if (savedRangeRef.current) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRangeRef.current);
    }
    if (linkUrl) {
      document.execCommand("createLink", false, linkUrl);
    }
    setShowLinkModal(false);
    
    // Manually trigger onChange since we bypassed handleBlur
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="relative group/editor w-full">
      {/* Floating Toolbar */}
      <div className="absolute -top-10 left-0 opacity-0 group-focus-within/editor:opacity-100 transition-opacity flex items-center gap-1 bg-card border border-border shadow-lg rounded-lg p-1 z-20 pointer-events-none group-focus-within/editor:pointer-events-auto">
        <button
          type="button"
          onMouseDown={(e) => handleFormat("bold", e)}
          className="p-1.5 hover:bg-accent rounded text-foreground transition-colors"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => handleFormat("italic", e)}
          className="p-1.5 hover:bg-accent rounded text-foreground transition-colors"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <div className="w-px h-4 bg-border mx-1" />
        <button
          type="button"
          onMouseDown={(e) => handleFormat("createLink", e)}
          className="p-1.5 hover:bg-accent rounded text-foreground transition-colors"
          title="Add Link"
        >
          <Link2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => handleFormat("unlink", e)}
          className="p-1.5 hover:bg-destructive/10 rounded text-destructive transition-colors text-xs font-bold"
          title="Remove Link"
        >
          Unlink
        </button>
      </div>

      {/* Link Input Modal */}
      {showLinkModal && (
        <div className="absolute -top-12 left-0 bg-card border border-border shadow-xl rounded-lg p-2 z-30 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <input
            type="url"
            autoFocus
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") applyLink();
              if (e.key === "Escape") setShowLinkModal(false);
            }}
            className="bg-background border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:border-primary w-64"
          />
          <button
            type="button"
            onClick={applyLink}
            className="p-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowLinkModal(false)}
            className="p-1.5 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        onBlur={handleBlur}
        className={`w-full outline-none resize-none cursor-text ${className} empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:cursor-pointer`}
        data-placeholder={placeholder}
      />
    </div>
  );
}
