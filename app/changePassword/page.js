"use client";
import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "@/components/ui/button";

function ChangePasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative" style={{ height: "calc(100vh - 5rem)" }}>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-center mb-4">
          Please enter your email address below.
        </p>
        <form className="max-w-[350px] w-full shadow rounded-xl mx-auto">
          <div className="w-full mb-2">
            <Label htmlFor="email" className="text-xl font-semibold">
              Email:
            </Label>
            <input
              type="email"
              name="email"
              className="w-full py-2 shadow rounded-md border border-slate-300"
              placeholder="Your email here ..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
