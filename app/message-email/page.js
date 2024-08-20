import {Card, CardContent} from "@/components/ui/card";
import { BsEnvelopeCheckFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function page() {
  return (
    <div className="w-full h-screen flex items-center justify-center" style={{height: "calc(100vh-5rem)"}}>
      <Card className="w-max">
        <CardContent>
            <div className="mx-auto w-max pb-2"><BsEnvelopeCheckFill style={{fontSize: "3rem"}}></BsEnvelopeCheckFill></div>
          <h1 className="text-center semibold text-xl pb-2">
            Please check your email to complete your registration.
          </h1>
          <h2 className="text-center semibold text-md">
            After that, you can login with your email and password.
          </h2>
          <Button className="block mt-6 w-max mx-auto"><Link href="/">Back Home</Link></Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
