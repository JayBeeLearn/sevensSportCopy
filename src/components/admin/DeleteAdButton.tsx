"use client";
import { Trash2 } from "lucide-react";
import { deleteAd } from "@/app/actions/ads";

export function DeleteAdButton({ id }: { id: string }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm("Delete this ad? This cannot be undone.")) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteAd.bind(null, id)} onSubmit={handleSubmit}>
      <button
        type="submit"
        title="Delete"
        className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/10 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
