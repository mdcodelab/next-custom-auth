"use client";
import { Button } from "./ui/button";
import { signOut } from "@/app/actions";

function SignOutButton({ children }) {
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/"; 
  };

  return (
    <Button className="w-[150px] mx-auto block bg-white text-black hover:bg-transparent bordered
     border-black text-md" 
    onClick={handleSignOut} style={{paddingTop: "-0.5rem", paddingBottom: "-0.5rem"}}>
      {children}
    </Button>
  );
}

export default SignOutButton;
