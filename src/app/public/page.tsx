"use client";

import { useSession } from "next-auth/react";

export default function PublicPage() {
  const { data: session } = useSession();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1>Public page</h1>
      {session && (
        <pre className="bg-slate-950 text-slate-50 p-10 rounded-lg">
          {JSON.stringify(session, null, 2)}
        </pre>
      )}
    </div>
  );
}
