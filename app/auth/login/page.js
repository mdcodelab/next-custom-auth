"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "@/app/actions";

function LoginPage() {
    const [password, setPassword]=useState("");
    const[email, setEmail]=useState("");
  

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
          await login(email, password);
          toast.success("Logged in successfully!")
        } catch (error) {
          console.error("error", error);
          toast.error(error.message);
        }
    }


  return (
    <div className="w-full flex items-center justify-center shadow" style={{height: "calc(100vh - 5rem)"}}>
      <div>
        <h1 className="text-center text-3xl font-semibold py-6">
          Welcome Back
        </h1>
        <form className="max-w-[350px] w-full shadow rounded-xl mx-auto" onSubmit={handleSubmit}>
          <div className="w-75 mb-2">
            <Label htmlFor="email" className="text-xl font-semibold">
              Email:
            </Label>
            <input
              type="email"
              name="email"
              className="w-full py-2 shadow rounded-md bordered
            border-slate-300 border-2"
              placeholder="Your email ..." required value={email} onChange={(e)=> setEmail(e.target.value)}
            ></input>
          </div>

          <div className="w-75 mb-2">
            <Label htmlFor="password" className="text-xl font-semibold">
              Password:
            </Label>
            <input
              type="password"
              name="password"
              className="w-full py-2 shadow rounded-md bordered
            border-slate-300 border-2"
              placeholder="Your password ..." value={password} onChange={(e)=> setPassword(e.target.value)}
            ></input>
          </div>

          <Button type="submit" className="w-full py-2 my-2 text-lg">
            Login
          </Button>
        </form>
        <div
          className="flex mx-auto justify-between bordered border-black mt-2"
          style={{ width: "max-content" }}
        >
          <p className="mr-2">Don't have an account?</p>
          <Link href="/auth/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
