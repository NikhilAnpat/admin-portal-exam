'use client'
import { useEffect } from "react";
import { redirect } from "next/navigation"; // Use the correct module for redirect
import Login from "./auth/login/page";

export default function Home() {
  useEffect(() => {
    redirect("/auth/login"); // Redirect to the login page
  }, []);

  return (
    <div>
      {/* <Login /> */}
    </div>
  );
}
