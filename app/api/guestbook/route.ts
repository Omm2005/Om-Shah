import { db } from "@/db";
import { guestbookEntries } from "@/db/schema";
import { auth } from "@/lib/auth";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const entries = await db
      .select()
      .from(guestbookEntries)
      .orderBy(desc(guestbookEntries.createdAt));

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Failed to fetch guestbook entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.name) {
      return NextResponse.json(
        { error: "You must be signed in to leave a message" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message } = body;

    // Validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message must be 500 characters or less" },
        { status: 400 }
      );
    }

    const [entry] = await db
      .insert(guestbookEntries)
      .values({
        name: session.user.name,
        message: message.trim(),
      })
      .returning();

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Failed to create guestbook entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}
