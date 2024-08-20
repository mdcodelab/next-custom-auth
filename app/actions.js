"use server";
import prisma from "../db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

// export async function sendVerificationEmail(email, emailToken) {
//   const transporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com",
//     port: 587,
//     secure: false, // true pentru port 465, false pentru port 587
//     auth: {
//       user: "d_mihaela@msn.com", // Adresa ta Yahoo
//       pass: process.env.USER_PASS, // Parola contului sau Parola de aplicație
//     },
//   });

//   const verificationUrl = `http://localhost:3000/api/verify-email?token=${emailToken}`;

//   const mailOptions = {
//     from: `"My App" <${process.env.USER_EMAIL}>`, // Adresa ta de email Yahoo
//     to: email,
//     subject: "Verify your email",
//     html: `<p>Please verify your email by clicking the following link:</p>
//            <a href="${verificationUrl}">Verify Email</a>`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Verification email sent successfully.");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//   }
// }

// Funcția de înregistrare
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

  // const user = await prisma.user.create({
  //   data: {
  //     name: name,
  //     email: email,
  //     hashedPassword: hashedPassword,
  //     emailToken: emailToken,
  //     emailVerified: false,
  //   },
  // });

  //await sendVerificationEmail(user.email, emailToken);
  await sendEmail(email);

}




  async function sendEmail(recipientEmail) {
    const apiKey = process.env.BREVO_KEY; // Make sure your API key is stored in an environment variable

    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Sender Alex",
            email: "mhl_dcn@yahoo.fr",
          },
          to: [
            {
              email: recipientEmail,
              name: "mihaela",
            },
          ],
          subject: "Hello world",
          htmlContent:
            "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>",
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






export async function getUserFromToken(authToken) {
  if (!authToken) {
    throw new Error("No token found");
  }

  try {
    const result = await request;
    console.log("Verification email sent successfully.");
    console.log(result.body); // Afișează răspunsul complet de la Mailjet
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
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

