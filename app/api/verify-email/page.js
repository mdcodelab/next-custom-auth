import prisma from "@/db";


async function page({searchParams}) {
  if (!searchParams.token) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: "calc(100vh - 5rem" }}
      >
        <h1 className="text-center text-xl semibold">
          You must verify your email before accessing the app.
        </h1>
      </div>
    );
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      emailToken: searchParams.token,
    },
  });

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: true,
    },
  });


  
  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 5rem" }}>
      <h1 className="text-center semibold text-xl pb-2">Hello, {existingUser?.name}</h1>
      <h2 className="text-center semibold text-lg">Now, you can now login in your account.</h2>
    </div>
  );
}

export default page
