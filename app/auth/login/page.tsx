"use client";

import React, { useState } from "react";
import bg_img from "../../../public/asset/background.svg";
import Image from "next/image";
import Logo_img from "../../../public/asset/logo.svg";
import Line_img from "../../../public/asset/line.svg";
import apiClient from "@/app/config"; // Assuming apiClient is Axios instance
import { useRouter } from "next/navigation"; // Import useRouter

const Page = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false); // Loading state
	const router = useRouter();

	const handleLogin = async () => {
		setIsLoading(true);
		setError(""); // Clear existing errors
		if (!email || !password) {
			setError("Please fill out all fields.");
			setIsLoading(false);
			return;
		}
		try {
			const response = await apiClient.post("/admin/login", { email, password });
			const token = response.data.accessToken;
			router.push("/mainHome/ProfileUpdate");

			if (token) {
				localStorage.setItem("token", token);
				apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
			} else {
				setError("Token not received from server.");
			}
		} catch (err) {
			setError(err.response?.data?.message || "Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
		// router.push("/mainHome/ProfileUpdate");
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
			<div className="w-full lg:w-[1200px] h-auto lg:h-[650px] transform -translate-x-1/2 -translate-y-1/2 left-[50%] flex top-[50%] m-auto backdrop-blur-lg bg-[#A5A5A538] p-6 rounded-lg absolute">
				<div className="w-1/2 h-full flex justify-center items-center">
					<Image width={180} height={180} src={Logo_img} alt="Logo" />
				</div>
				<div className="w-1/2 h-full flex justify-center items-center">
					<div className="w-[480px] h-auto lg:h-[480px] rounded-3xl ml-16 p-10 bg-white">
						<div className="text-black">
							<h1 className="font-extrabold text-2xl text-black">Log in</h1>
							<p className="text-[14px] text-[#7F7F7F]">
								Welcome to Free Shops App Controller
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<div className="mt-14">
								<label className="font-semibold text-sm text-black" htmlFor="username ">
									User Name
								</label>
								<input
									id="username"
									className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg text-black cursor-pointer"
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="relative">
								<label className="font-semibold text-sm text-black" htmlFor="password">
									Password
								</label>
								<div className="relative">
									<input
										id="password"
										className="w-full px-3 h-10 border rounded-lg border-[#7F7F7F] pr-10 text-black cursor-pointer"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute inset-y-0 right-2 flex items-center text-[#7F7F7F]"
										aria-label={
											showPassword ? "Hide password" : "Show password"
										}
									>
										{showPassword ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.893-.683 1.734-1.196 2.504M15 12a3 3 0 11-6 0 3 3 0zM2.458 12A10.04 10.04 0 0112 5c4.477 0 8.268 2.943 9.542 7A10.042 10.042 0 0112 19c-4.477 0-8.268-2.943-9.542-7z"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M3.98 8.65A9.961 9.961 0 0112 4c4.477 0 8.268 2.943 9.542 7-.274.893-.683 1.734-1.196 2.504M15 12a3 3 0 11-6 0 3 3 0z"
												/>
											</svg>
										)}
									</button>
								</div>
							</div>
							<div className="flex flex-col items-center gap-7">
								<div
									onClick={() => router.push("/auth/forgotPassword")}
									className="text-sm text-[#7F7F7F] cursor-pointer"
								>
									Forgot Password?
								</div>
								<div
									className={`w-fit px-5 font-[700] py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-[#199FB1]"
										} text-white cursor-pointer ${isLoading ? "cursor-not-allowed" : ""
										}`}
									onClick={!isLoading ? handleLogin : undefined}
								>
									{isLoading ? "Logging in..." : "Log in"}
								</div>
								<div
									onClick={() => router.push("/auth/signUp")}
									className="text-[#7CB5EC] cursor-pointer"
								>
									Create New Account
								</div>
								{error && (
									<div className="text-red-500 text-sm">{error}</div>
								)}
								<div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-[50%] top-[50%]">
									<Image src={Line_img} height={560} alt="Line" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
