"use client";

import { useState, useEffect, useTransition } from "react";
import { Heart, Flame, Target, Zap } from "lucide-react";
import { toggleReaction, type ReactionType } from "@/app/actions/reactions";

interface ReactionState {
  like: number;
  fire: number;
  goal: number;
  shock: number;
}

interface ReactionModuleProps {
  postId: string;
  initialCounts: ReactionState;
}

export function ReactionModule({ postId, initialCounts }: ReactionModuleProps) {
  const [isPending, startTransition] = useTransition();
  const [counts, setCounts] = useState<ReactionState>(initialCounts);
  const [userReacted, setUserReacted] = useState<ReactionType[]>([]);

  useEffect(() => {
    // Load local reaction state to preserve ISR while showing correct UI for the user
    const saved = localStorage.getItem(`reactions_${postId}`);
    if (saved) {
      setUserReacted(JSON.parse(saved));
    }
  }, [postId]);

  const handleReaction = (type: ReactionType) => {
    const hasReacted = userReacted.includes(type);
    
    // Optimistic UI update
    setCounts((prev) => ({
      ...prev,
      [type]: hasReacted ? prev[type] - 1 : prev[type] + 1,
    }));
    
    const newReacted = hasReacted
      ? userReacted.filter((r) => r !== type)
      : [...userReacted, type];
      
    setUserReacted(newReacted);
    localStorage.setItem(`reactions_${postId}`, JSON.stringify(newReacted));

    // Server action
    startTransition(() => {
      toggleReaction(postId, type);
    });
  };

  const optimisticState = { counts, userReacted };

  return (
    <div className="flex flex-col gap-6 sticky top-24 h-fit">
      <button
        onClick={() => handleReaction("like")}
        className={`flex flex-col items-center gap-1 transition-colors group ${optimisticState.userReacted.includes("like") ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
      >
        <div className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all relative ${optimisticState.userReacted.includes("like") ? "border-primary bg-primary/10" : "border-border bg-card group-hover:border-primary group-hover:bg-primary/10"}`}>
          <Heart className={`h-5 w-5 ${optimisticState.userReacted.includes("like") ? "fill-primary" : ""}`} />
          <span className="absolute -top-2 -right-2 bg-background text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-border">
            {optimisticState.counts.like}
          </span>
        </div>
        <span className="text-xs font-semibold">Like</span>
      </button>

      <button
        onClick={() => handleReaction("fire")}
        className={`flex flex-col items-center gap-1 transition-colors group ${optimisticState.userReacted.includes("fire") ? "text-orange-500" : "text-muted-foreground hover:text-orange-500"}`}
      >
        <div className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all relative ${optimisticState.userReacted.includes("fire") ? "border-orange-500 bg-orange-500/10" : "border-border bg-card group-hover:border-orange-500 group-hover:bg-orange-500/10"}`}>
          <Flame className={`h-5 w-5 ${optimisticState.userReacted.includes("fire") ? "fill-orange-500" : ""}`} />
          <span className="absolute -top-2 -right-2 bg-background text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-border">
            {optimisticState.counts.fire}
          </span>
        </div>
        <span className="text-xs font-semibold">Fire</span>
      </button>

      <button
        onClick={() => handleReaction("goal")}
        className={`flex flex-col items-center gap-1 transition-colors group ${optimisticState.userReacted.includes("goal") ? "text-green-500" : "text-muted-foreground hover:text-green-500"}`}
      >
        <div className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all relative ${optimisticState.userReacted.includes("goal") ? "border-green-500 bg-green-500/10" : "border-border bg-card group-hover:border-green-500 group-hover:bg-green-500/10"}`}>
          <Target className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 bg-background text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-border">
            {optimisticState.counts.goal}
          </span>
        </div>
        <span className="text-xs font-semibold">Goal</span>
      </button>

      <button
        onClick={() => handleReaction("shock")}
        className={`flex flex-col items-center gap-1 transition-colors group ${optimisticState.userReacted.includes("shock") ? "text-yellow-500" : "text-muted-foreground hover:text-yellow-500"}`}
      >
        <div className={`h-12 w-12 rounded-full border flex items-center justify-center transition-all relative ${optimisticState.userReacted.includes("shock") ? "border-yellow-500 bg-yellow-500/10" : "border-border bg-card group-hover:border-yellow-500 group-hover:bg-yellow-500/10"}`}>
          <Zap className={`h-5 w-5 ${optimisticState.userReacted.includes("shock") ? "fill-yellow-500" : ""}`} />
          <span className="absolute -top-2 -right-2 bg-background text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-border">
            {optimisticState.counts.shock}
          </span>
        </div>
        <span className="text-xs font-semibold">Shock</span>
      </button>
    </div>
  );
}
