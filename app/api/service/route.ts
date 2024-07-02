import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (session.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }


  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 },
    );
  }

  const body = await req.json();
  const { name, branch } = body;
  const duration = parseInt(body.duration, 10);
  if (!name || !duration || !branch) {
    return NextResponse.json(
      { message: "Please provide all fields" },
      { status: 400 },
    );
  }

  if (duration <= 0) {
    return NextResponse.json({ message: "Invalid duration" }, { status: 400 });
  }

  try {
    // Fetch the branch ID based on the branch name
    const branchRecord = await prisma.branch.findUnique({
      where: {
        name: branch,
      },
    });

    if (!branchRecord) {
      return NextResponse.json(
        { message: "Branch not found" },
        { status: 404 },
      );
    }

    const service = await prisma.service.create({
      data: {
        name: name,
        duration: duration,
      },
    });

    await prisma.serviceBranch.create({
      data: {
        service_id: service.id,
        branch_id: branchRecord.id,
      },
    });

    return NextResponse.json(
      { message: "Service created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

