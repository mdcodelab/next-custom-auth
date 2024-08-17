import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import SignOutButton from "./SignOutButton";
import { getUserFromToken} from "../app/actions"
import { cookies } from "next/headers";

async function Navbar() {
  // Accesarea cererii HTTP folosind cookies în app router
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  let user = null;
  if (authToken) {
    try {
      user = await getUserFromToken(authToken);
      console.log(user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }


  if (!user) {
    return (
      <nav className="w-full h-[5rem] bg-black flex items-center justify-end pr-8">
        <Button className="text-md">
          <Link href="/auth/login" className="text-white text-md">
            Login
          </Link>
        </Button>
      </nav>
    );
  }

  return (
    <nav className="w-full h-[5rem] bg-black flex items-center justify-end pr-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-[2.5rem] text-lg"
            style={{ width: "max-content" }}
          >
            {user?.email}
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="text-center w-[200px]">
            <SignOutButton>Sign Out</SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default Navbar;
