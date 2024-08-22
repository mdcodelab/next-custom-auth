import { Google } from "arctic";

//const googleAuthClient = new Google(clientId, clientSecret, redirectURI);

export const googleAuthClient = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_URL + `/api/google`
);
