import { connectDB } from "@/lib/db";
import Event from "@/models/Event";
import { NextResponse } from "next/server";
import { getUserFromReq } from "@/lib/middleware";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const user = getUserFromReq(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const event = await Event.findOneAndUpdate(
    { _id: params.id, userId: user.id },
    body,
    { new: true }
  );

  return NextResponse.json(event);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const user = getUserFromReq(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await Event.findOneAndDelete({
    _id: params.id,
    userId: user.id,
  });

  return NextResponse.json({ message: "Deleted" });
}