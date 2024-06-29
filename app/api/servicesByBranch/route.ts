import { prisma } from "@/lib/prisma";

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("branch_id");
  try {
    const services = await prisma.service.findMany({
      where: {
        branches: {
          some: {
            branch_id: Number(id),
          },
        },
      },
    });
    return Response.json({
      status: 200,
      data: services,
    });
  } catch (error: any) {
    return Response.json({
      status: 500,
      message: error.message,
    });
  }
};
