import type { GuestbookEntry } from "@/db/schema";

interface GuestbookEntryProps {
  entry: GuestbookEntry;
}

export function GuestbookEntryCard({ entry }: GuestbookEntryProps) {
  const formattedDate = new Date(entry.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="py-2 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-sm">
      <div className="flex items-baseline gap-2 min-w-0 flex-1">
        <span className="text-foreground/90 font-medium whitespace-nowrap">{entry.name}:</span>
        <span className="text-foreground/60 wrap-break-word min-w-0">{entry.message}</span>
      </div>
      <span className="text-foreground/30 text-xs whitespace-nowrap ml-auto sm:ml-0 shrink-0">{formattedDate}</span>
    </div>
  );
}
