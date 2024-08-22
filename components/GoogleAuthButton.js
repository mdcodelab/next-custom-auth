"use client";
import { Button } from "./ui/button";

function GoogleAuthButton() {
  return (
    <Button className="py-4 w-full mb-2 flex items-center justify-center">
      <img
        src="/images/google.png"
        style={{ width: "2rem", height: "2rem" }}
      ></img>
    </Button>
  );
}

export default GoogleAuthButton
