"use client";
import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Button } from "@/components/ui/button";
import { changePassword } from "@/app/actions";
import toast from "react-hot-toast";

function ChangePasswordPage() {
  const [email, setEmail] = useState("");
  const[newPassword, setNewPassword]=useState("");
  const[retypePassword, setRetypePassword]=useState("");

  async function handleChangePassword (e) {
    e.preventDefault();
    try {
      await changePassword(email, newPassword, retypePassword);
      toast.success("You password was changed successfully.");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="relative" style={{ height: "calc(100vh - 5rem)" }}>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-center mb-4">
          Please enter your email address below.
        </p>
        <form className="max-w-[350px] w-full shadow rounded-xl mx-auto" onSubmit={handleChangePassword}>
          <div className="w-full mb-4">
            <Label htmlFor="email" className="text-lg font-semibold">
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

          <div className="w-full mb-4">
            <Label htmlFor="password" className="text-lg font-semibold">
              New password
            </Label>
            <input
              type="password"
              name="password"
              className="w-full py-2 shadow rounded-md border border-slate-300"
              placeholder="Your new password here ..."
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-full mb-4">
            <Label htmlFor="retypePassword" className="text-lg font-semibold">
              Retype new password:
            </Label>
            <input
              type="password"
              name="retypePassword"
              className="w-full py-2 shadow rounded-md border border-slate-300"
              placeholder="Retype the new password ..."
              required
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          </div>

          <Button className="w-full text-lg" type="submit">Change password</Button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
