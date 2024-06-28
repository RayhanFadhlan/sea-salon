import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const POST = async (req : Request) => {

    const body = await req.json()
    const {email,name,phone,password} = body
    if(!email || !name || !phone || !password){
        return Response.json(
            { message: "Please provide all fields" },
            { status: 400 }
        )
    }
    const user = await prisma.user.findUnique({
        where: {
            email : email
        }
    })
    if(user){
        return Response.json(
            { message: "User Already Exists" },
            { status: 400 }
          )
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    // const hashedPassword = password
    const newUser = await prisma.user.create({
        data: {
            email: email,
            name: name,
            phone: phone,
            password: hashedPassword,
            role : "CUSTOMER"
        }
    })
    return Response.json(
        { message: "User Created Successfully" },
        { status: 200 }
    )
}