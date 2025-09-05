"use client";
import { useUser } from "../../app/context/Usercontext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // redirect if not logged in
    }
  }, [user, router]);

  if (!user) return <p className="p-6">Loading...</p>;

  return children;
}
