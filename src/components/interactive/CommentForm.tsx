"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitComment } from "@/app/actions/comments";
import { Send, User } from "lucide-react";

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [state, formAction, isPending] = useActionState(submitComment, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-card border border-border rounded-xl p-6 mt-12">
      <h3 className="text-xl font-bold mb-6 text-card-foreground">Leave a Reply</h3>
      
      {state?.success && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm font-medium">
          {state.message}
        </div>
      )}
      
      {state?.error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="postId" value={postId} />
        
        <div>
          <label htmlFor="guestName" className="block text-sm font-medium text-muted-foreground mb-1">
            Name <span className="text-xs opacity-70">(Optional, posts as Guest)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              name="guestName"
              id="guestName"
              className="block w-full pl-10 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Your name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-muted-foreground mb-1">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content"
            id="content"
            rows={4}
            required
            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y"
            placeholder="What are your thoughts?"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                Posting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Post Comment
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
