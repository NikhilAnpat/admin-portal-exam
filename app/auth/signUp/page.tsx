"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "../../config"; 
import bg_img from "../../../public/asset/background.svg";
import Image from "next/image";
import Logo_img from "../../../public/asset/logo.svg";
import Line_img from "../../../public/asset/line.svg";
import { Eye, EyeOff } from "lucide-react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const signUpUser = async () => {
    const { name, email, phone, password, confirmPassword } = formData;

    // Input validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true); // Start loading state

    try {
      const response = await apiClient.post("/admin/registration", {
        name,
        email,
        phone,
        password,
      });
      console.log("Sign up successful: ", response.data);
      alert("Account created successfully!");
      router.push("/auth/login"); // Redirect after successful sign-up
    } catch (error) {
      console.error("Sign up failed: ", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div className="w-full h-full">
        <Image
          className="w-full h-full object-cover relative"
          src={bg_img}
          alt="Background"
        />
      </div>
      <div className="w-[95%] max-w-[1200px] h-auto lg:h-[650px] transform -translate-x-1/2 -translate-y-1/2 left-[50%] flex top-[50%] m-auto backdrop-blur-lg bg-[#A5A5A538] p-6 rounded-lg absolute">
        <div className="w-1/2 h-full flex justify-center items-center">
          <Image width={180} height={180} src={Logo_img} alt="Logo" />
        </div>

        <div className="w-1/2 h-full flex justify-center items-center">
          <div className="w-[480px] h-auto rounded-3xl ml-16 p-10 bg-white">
            <div>
              <h1 className="font-extrabold text-2xl text-black">Create New Account</h1>
              <p className="text-[14px] text-[#7F7F7F]">
                Welcome to Free Shops App Controller
              </p>
            </div>
            <div className="flex flex-col gap-2 text-black">
              <div className="mt-6 text-black">
                <label className="font-semibold text-sm" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  aria-label="Your Name"
                  className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="text-black">
                <label className="font-semibold text-sm" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  aria-label="Email"
                  className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="font-semibold text-sm" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  aria-label="Phone Number"
                  className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <label className="font-semibold text-sm" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    aria-label="Password"
                    className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg pr-10"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-[#7F7F7F]"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label
                  className="font-semibold text-sm"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    aria-label="Confirm Password"
                    className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg pr-10"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute inset-y-0 right-2 flex items-center text-[#7F7F7F]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-7 mt-1">
                <button
                  onClick={signUpUser}
                  disabled={isLoading}
                  className={`w-fit mt-2 px-5 font-[700] py-2 rounded-lg ${
                    isLoading ? "bg-gray-500" : "bg-[#199FB1]"
                  } text-white`}
                >
                  {isLoading ? "Creating..." : "Create Account"}
                </button>
                <div
                  onClick={() => router.push("/auth/login")}
                  className="text-[#7CB5EC] cursor-pointer"
                >
                  Already have an account?
                </div>
              </div>

              <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-[50%] top-[50%]">
                <Image src={Line_img} height={560} alt="Decorative Line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

