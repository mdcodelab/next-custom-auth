import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserFromToken } from "../actions";
import { cookies } from "next/headers";


async function ProfilePage() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if(!authToken) {
    redirect("/");
  }

  return (
    <div>
      <h1>Profile page</h1>
      <Link href="/" className="bg-black text-white p-2 my-2">Back home</Link>
    </div>
  )
}

export default ProfilePage;