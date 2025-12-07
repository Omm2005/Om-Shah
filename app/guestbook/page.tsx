import { Guestbook } from "@/components/guestbook/Guestbook";

export const metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave a message!",
};

export default function GuestbookPage() {
  return (
    <main className="w-full pt-10">
      <Guestbook />
    </main>
  );
}