"use client";
import { Button } from "./ui/button";

function SignOutButton({children}) {
  return (
    <Button className="w-[150px] mx-auto">{children}</Button>
  )
}

export default SignOutButton
