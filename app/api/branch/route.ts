import { prisma } from "@/lib/prisma";
export const GET = async (req: Request) => {
  if (req.method !== "GET") {
    return Response.json({
      status: 405,
      message: "Method not allowed",
    });
  }
  const services = await prisma.branch.findMany();
  return Response.json({
    status: 200,
    data: services,
  });
};
