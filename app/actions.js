"use server";
import prisma from "../db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


//SEND VERIFICATION EMAIL
export async function sendVerificationEmail(email, verificationUrl) {
  const apiKey = process.env.BREVO_KEY;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "My app",
          email: "mhl_dcn@yahoo.fr",
        },
        to: [
          {
            email: email, 
            name: "mihaela",
          },
        ],
        subject: "Email verification",
        htmlContent: `<html><head></head><body><p>Hello,</p>
                      <p>Please complete your registration by clicking the link below:</p>
                      <a href="${verificationUrl}">Verify Your Email</a>
                      <p>If you did not request this, please ignore this email.</p>
                      </body></html>`,
      },
      {
        headers: {
          accept: "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
      }
    );

    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}


//REGISTER
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

  const emailToken = uuidv4();

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      hashedPassword: hashedPassword,
      emailToken: emailToken,
      emailVerified: false,
    },
  });
const verificationUrl = `http://localhost:3000/api/verify-email?token=${emailToken}`;
  await sendVerificationEmail(user.email, verificationUrl);
  redirect("/message-email");
}



//LOGIN
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

if(!existingUser.emailToken) {
throw new Error ("Please verify your email.");
}

// generate a JWT token
const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
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

  const auth_token = cookies().set("auth_token", token, {
    httpOnly: true, // Cookie-ul este accesibil doar serverului
    secure: process.env.NODE_ENV === "production", // Cookie-ul este securizat doar în producție
    sameSite: "strict", // Cookie-ul este accesibil doar pe același site
    path: "/",
    maxAge: 3600, // Cookie-ul expiră după 1 oră
  });

  if(!auth_token) {
    throw new Error("No auth token");
  }

  redirect("/profile");
}


export async function getUserFromToken(authToken) {
  if (!authToken) {
    throw new Error("No token found");
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
    // Decodifică tokenul JWT pentru a obține informațiile utilizatorului
    const decodedToken = jwt.verify(authToken, JWT_SECRET);

    // Caută utilizatorul în baza de date după ID-ul din token
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error retrieving user from token:", error);
    throw new Error("Failed to retrieve user");
  }
}




export async function signOut() {
  cookies().delete("auth_token");
}


