import { NextResponse } from "next/server";
import { db } from "../../../libs/db";
import { hash } from "bcrypt-ts";
import * as zod from "zod";

const userSchema = zod
    .object({
        username: zod.string().min(6, "username must have 6 digits"),
        email: zod.string().min(1, "Email is required").email("Invalid email"),
        password: zod
            .string()
            .min(1, "Password is required")
            .min(8, "Password must have than 8 characters"),
    })

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        const existingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            },
        });
        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                success: false,
                message: 'This Email already exists',
                statusCode: 409,
            })
        }
        const existingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            },
        });
        if (existingUserByUsername) {
            return NextResponse.json({
                user: null,
                success: false,
                message: 'This username already exists',
                statusCode: 409,
            })
        }
        const hashedPssword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPssword,
            }
        })

        const { password: newUserPassword, ...res } = newUser;

        return NextResponse.json({ user: res, message: "user created succesfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "something went wrong" }, { status: 500 });
    }
}