import { prisma } from "@/lib/prisma";
export const GET = async (req: Request) => {
  if (req.method !== "GET") {
    return Response.json({
      status: 405,
      message: "Method not allowed",
    });
  }
  const reviews = await prisma.review.findMany();
  return Response.json({
    status: 200,
    data: reviews,
  });
};

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json(
      {message: "Method not allowed"},
      {status: 405},
    );
  }
  const data = await req.json();
  console.log(data);
  if (!data.name || !data.rating || !data.comment) {
    return Response.json(
      {message: "Please provide name, rating, and comment"},
      {status: 400},
    );
  }
  const rating = parseInt(data.rating, 10);
  const review = await prisma.review.create({
    data: {
      name: data.name,
      rating: rating,
      comment: data.comment,
    },
  });

  return Response.json({
    status: 200,
    message: review,
  });
};
