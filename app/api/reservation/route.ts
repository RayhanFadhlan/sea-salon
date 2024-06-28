import {prisma} from "@/lib/prisma";

export const GET = async (req: Request) => {
    const url = new URL(req.url);
    // Extract the user_id query parameter
    const userId = url.searchParams.get('user_id');

    // Check if user_id is provided and is a valid number
    if (!userId || isNaN(Number(userId))) {
        return new Response(JSON.stringify({
            error: "Invalid or missing user_id query parameter"
        }), { status: 400 });
    }
        
    const reservations = await prisma.reservation.findMany({
        where: {
            user_id: Number(userId)
        },
        include: {
            branch: true,
            service: true
        }
    });
    

    const ret = reservations.map((reservation) => {
        return {
            id: reservation.id,
            user_name: reservation.name,
            phone: reservation.phone,
            branch_name: reservation.branch.name,
            service_name: reservation.service.name,
            duration: reservation.service.duration,
            time: reservation.time,
            date: reservation.date
        }
    });
    
    return Response.json({
        status: 200,
        data: ret
    });
}

export const POST = async (req: Request) => {
    
    if(req.method !== 'POST'){
        return Response.json(
            { message: "Method not allowed" },
            { status: 405 },
        )
    }

    const data = await req.json()
    console.log(data)
    if(!data.user_id || !data.branch_id || !data.service_id || !data.time){
        return Response.json(
            {message: 'Please provide user_id, branch_id, service_id, and time'},
            {status: 400},
        )
    }

    const branch = await prisma.branch.findUnique({
        where: {
            id : data.branch_id
        }
    });

    const service = await prisma.service.findUnique({
        where: {
            id : data.service_id
        }
    });
    const inputTime = new Date(`1970-01-01T${data.time}:00`);
    const branchOpenTime = new Date(`1970-01-01T${branch?.open_time}:00`);
    const branchCloseTime = new Date(`1970-01-01T${branch?.close_time}:00`);

    if(inputTime < branchOpenTime || inputTime > branchCloseTime){
        return Response.json(
            {message: `Please input a valid time within branch operating hours (${branch?.open_time} - ${branch?.close_time})`},
            {status: 400},
        )
    }
    try{
        const reservation = await prisma.reservation.create({
            data : data
        })
        return Response.json({
            status: 200,
            message: 'Reservation created'
        })
    }catch(e : any){
        return Response.json({
            status: 400,
            message: e.message
        })
    }

    
    // if(!data.name || !data.phone || !data.branch || !data.service || !data.time){
    //     return Response.json({
    //         status: 400,
    //         message: 'Please provide name, phone, branch, service, and time'
    //     })
    // }
    // const service = await prisma.service.findUnique({
    //     where: {
    //         name: data.service
    //     }
    // });
    // const branch = await prisma.branch.findUnique({
    //     where: {
    //         name: data.branch
    //     }
    // });

    // if ()

}