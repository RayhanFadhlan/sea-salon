import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export const POST = async (req : Request) => {
    if (req.method !== 'POST') {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }
    const body = await req.json();
    const {name, location,open_time, close_time} = body;
    if (!name || !open_time || !close_time || !location) {
        return NextResponse.json(
            { message: "Please provide all fields" },
            { status: 400 }
        );
    }
    if (open_time >= close_time) {
        return NextResponse.json(
            { message: "Invalid time" },
            { status: 400 }
        );
    }
    try {
        const branch = await prisma.branch.create({
            data: {
                name: name,
                location: location,
                open_time: open_time,
                close_time: close_time
        
              },
        });
        return NextResponse.json(
            { message: "Branch created successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            // @ts-ignore
            { message: error.message },
            { status: 500 }
        );
    }
}
