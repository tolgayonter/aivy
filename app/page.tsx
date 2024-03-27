import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/entry" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-6xl mb-4">Aivy</h1>
        <p className="text-2xl text-white/75 mb-4">
          Your super personal high artificial intelligence beautiful assistant.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
