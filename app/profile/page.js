import { redirect } from "next/navigation";
import Link from "next/link";

async function ProfilePage() {
  
  return (
    <div>
      <h1>Profile page</h1>
      <Link href="/" className="bg-black text-white p-2 my-2">Back home</Link>
    </div>
  )
}

export default ProfilePage