"use server";
import prisma from "../db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const register = async (name, email, password, rePassword) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  if (password !== rePassword) {
    throw new Error("Passwords must match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    },
  });

  // generate a JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // store the token in a cookie
  cookies().set("auth_token", token, {
    httpOnly: true, // Cookie-ul este accesibil doar serverului
    secure: process.env.NODE_ENV === "production", // Cookie-ul este securizat doar în producție
    sameSite: "strict", // Cookie-ul este accesibil doar pe același site
    path: "/",
    maxAge: 3600, // Cookie-ul expiră după 1 oră
  });

  redirect("/profile");
}



export async function getUserFromToken(authToken) {
  if (!authToken) {
    throw new Error("No token found");
  }

  try {
    const decoded = jwt.verify(authToken, JWT_SECRET);
    return decoded; // Returnează informațiile decodificate (de obicei conține userId și email)
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new Error("Invalid token");
  }
}

 
 
export async function signOut() {
  cookies().delete('auth_token')
}


export const login = async (email, password) => {
const existingUser = await prisma.user.findUnique({
  where: {
    email: email
  }
})

console.log(existingUser);
if(!existingUser) {
throw new Error("Invalid email or password.");
}

const isPasswordValid = await bcrypt.compare(password, existingUser.hashedPassword);
if(!isPasswordValid) {
  throw new Error("Invalid password.");
}

// generate a JWT token
  const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

// store the token in a cookie
  cookies().set("auth_token", token, {
    httpOnly: true, // Cookie-ul este accesibil doar serverului
    secure: process.env.NODE_ENV === "production", // Cookie-ul este securizat doar în producție
    sameSite: "strict", // Cookie-ul este accesibil doar pe același site
    path: "/",
    maxAge: 3600, // Cookie-ul expiră după 1 oră
  });

  redirect("/profile");
}

