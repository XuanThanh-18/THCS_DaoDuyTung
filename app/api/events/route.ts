import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: "asc" },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
        description: body.description,
        eventDate: new Date(body.eventDate || body.date),
        location: body.location,
        category: body.category,
        coverImage: body.coverImage,
        authorId: body.authorId,
        status: body.status || "DRAFT",
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 },
    );
  }
}
