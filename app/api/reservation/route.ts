import { authOptions } from "@/app/utils/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if(!session){
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (req.method !== "POST") {
    return Response.json({ message: "Method not allowed" }, { status: 405 });
  }

  const data = await req.json();
  console.log(data);
  if (!data.user_id || !data.branch_id || !data.service_id || !data.time) {
    return Response.json(
      { message: "Please provide user_id, branch_id, service_id, and time" },
      { status: 400 },
    );
  }

  const branch = await prisma.branch.findUnique({
    where: {
      id: data.branch_id,
    },
  });

  const service = await prisma.service.findUnique({
    where: {
      id: data.service_id,
    },
  });
  const inputTime = new Date(`1970-01-01T${data.time}:00`);
  const branchOpenTime = new Date(`1970-01-01T${branch?.open_time}:00`);
  const branchCloseTime = new Date(`1970-01-01T${branch?.close_time}:00`);

  if (inputTime < branchOpenTime || inputTime > branchCloseTime) {
    return Response.json(
      {
        message: `Please input a valid time within branch operating hours (${branch?.open_time} - ${branch?.close_time})`,
      },
      { status: 400 },
    );
  }
  try {
    const reservation = await prisma.reservation.create({
      data: data,
    });
    return Response.json({
      status: 200,
      message: "Reservation created",
    });
  } catch (e: any) {
    return Response.json({
      status: 400,
      message: e.message,
    });
  }


};
