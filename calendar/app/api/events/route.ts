import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import { getUserFromReq } from "@/lib/middleware";

export async function GET(req: Request) {
  await connectDB();

  const user = getUserFromReq(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const events = await Event.find({ userId: user.id });

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  await connectDB();

  const user = getUserFromReq(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, date } = await req.json();

  const event = await Event.create({
    userId: user.id,
    title,
    description,
    date,
  });

  return NextResponse.json(event);
}