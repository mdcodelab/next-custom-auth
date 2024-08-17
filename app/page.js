import Link from "next/link";

function HomePage() {
  return (
    <div>
      <h1>Home page</h1>
      <Link href="/profile" className="bg-black text-white p-2 my-2">
        Profile page
      </Link>
    </div>
  );
}

export default HomePage
