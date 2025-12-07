"use client";

import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { GuestbookForm } from "./GuestbookForm";
import type { GuestbookEntry } from "@/db/schema";
import { GuestbookEntryCard } from "./GuestbookEntry";

function GuestbookContent() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/guestbook");
      if (!response.ok) throw new Error("Failed to fetch entries");
      const data = await response.json();
      setEntries(data);
    } catch {
      // Silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewEntry = (entry: GuestbookEntry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 py-2 px-4 md:px-0">
      <h1 className="text-xl font-medium text-foreground">Sign my Guestbook</h1>

      <GuestbookForm onNewEntry={handleNewEntry} />

      <div className="space-y-1">
        {isLoading ? (
          <p className="text-sm text-foreground/40">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-foreground/40">No messages yet.</p>
        ) : (
          entries.map((entry) => (
            <GuestbookEntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}

export function Guestbook() {
  return (
    <SessionProvider>
      <GuestbookContent />
    </SessionProvider>
  );
}
