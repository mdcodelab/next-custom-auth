import { googleAuthClient } from "@/lib/googleOath";
import prisma from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function GET (    req) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.error("no code or state");
    return new Response("Invalid Request", { status: 400 });
  }

  //generate codeVerifier
  const codeVerifier = cookies().get("codeVerifier")?.value;
  //retrieves the authorization code from the URL
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    console.error("no code verifier or state");
    return new Response("Invalid Request", { status: 400 });
  }

  if (state !== savedState) {
    console.error("state mismatch");
    return new Response("Invalid Request", { status: 400 });
  }

  const { accessToken } = await googleAuthClient.validateAuthorizationCode(
    code,
    codeVerifier
  );
  const googleResponse = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const googleData = await googleResponse.json();

  let userId = "";
  let verifiedEmail = false;
  // if the email exists in our record, we can create a cookie for them and sign them in
  // if the email doesn't exist, we create a new user, then craete cookie to sign them in

  const existingUser = await prisma.user.findUnique({
    where: {
      email: googleData.email,
    },
  });
  if (existingUser) {
    userId = existingUser.id;
    verifiedEmail = true;
  } else {
    const user = await prisma.user.create({
      data: {
        name: googleData.name,
        email: googleData.email,
        picture: googleData.picture,
        verifiedEmail: true,
      },
    });
    userId = user.id;
  }

  // Set a cookie to log the user in
  cookies().set("user_session", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/profile");
}