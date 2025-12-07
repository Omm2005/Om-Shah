"use client";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import type { GuestbookEntry } from "@/db/schema";

interface GuestbookFormProps {
  onNewEntry: (entry: GuestbookEntry) => void;
}

export function GuestbookForm({ onNewEntry }: GuestbookFormProps) {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.name || !message.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const entry = await response.json();
        onNewEntry(entry);
        setMessage("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <p className="text-sm text-foreground/40">Loading...</p>;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="text-sm text-foreground/60 hover:text-foreground underline underline-offset-4 transition-colors"
      >
        Sign in with Google to leave a message
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a message..."
          maxLength={200}
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 text-sm border-b border-foreground/20 bg-transparent text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="px-4 py-2 text-sm text-foreground/70 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "..." : "Sign"}
        </button>
      </div>
      <p className="text-xs text-foreground/40">
        {session.user?.name} ·{" "}
        <button
          type="button"
          onClick={() => signOut()}
          className="hover:text-foreground/60 transition-colors"
        >
          sign out
        </button>
      </p>
    </form>
  );
}

