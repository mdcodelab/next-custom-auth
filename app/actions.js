"use server";
import prisma from "../db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const register = async (name, email, password, rePassword) => {
const existingUser = await prisma.user.findUnique({
  where: {
    email: email
  }
})

if(existingUser) {
  throw new Error("User with this email already exists.");
}

if(password !== rePassword) {
  throw new Error("Passwords must match");
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
  data: {
    name: name,
    email: email,
    hashedPassword: hashedPassword
  }
})

redirect("/profile");

}



export const login = async (email, password) => {

}

