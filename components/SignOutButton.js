"use client";
import { Button } from "./ui/button";
import { signOut } from "@/app/actions";

function SignOutButton({ children }) {
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/"; 
  };

  return (
    <Button className="w-[150px] mx-auto" onClick={handleSignOut}>
      {children}
    </Button>
  );
}

export default SignOutButton;
