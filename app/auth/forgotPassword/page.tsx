"use client";

import React, { useState } from "react";
import bg_img from "../../../public/asset/background.svg";
import Image from "next/image";
import Logo_img from "../../../public/asset/logo.svg";
import Line_img from "../../../public/asset/line.svg";
import apiClient from "@/app/config";
import { useRouter } from "next/navigation";

const Page = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [newPassword, setNewPassword] = useState(""); // State for new password
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const [userID, setUserID] = useState('');

    const [otp, setOtp] = useState("");  // State to store OTP
    const router = useRouter();

    const handlePasswordReset = async () => {
        try {
            const response = await apiClient.post("/admin/forgetPassword", {
                email,
            });

            console.log('Received OTP:', response.data.data.otp);
            setOtp(response.data.data.otp);  // Set OTP received from the API
        } catch (err) {
            console.error("Password reset failed:", err);
            setError("Error occurred. Please try again later.");
            setSuccess("");
        }
    };

    const submitOtp = async () => {
        try {
            const response = await apiClient.post("/admin/forgotVerifyotp", {
                email,
                otp,
            });

            console.log('otp submit', response.data.data.userId)
            setUserID(response.data.data.userId)

            if (response.status === 200) {
                // OTP submission successful, show new password fields
                setIsOtpSubmitted(true);
            }
        } catch (err) {
            console.error("OTP verification failed:", err);
            setError("Error occurred. Please try again later.");
            setSuccess("");
        }
    };

    const handleSaveNewPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await apiClient.post(`/admin/changePassword/${userID}`, {
                newPassword,
                confirmPassword,
            });

            if (response.status === 200) {
                setSuccess("Password changed successfully");
                setError("");
                setNewPassword("");
                setConfirmPassword("");
                router.push("/auth/login");
            }
        } catch (err) {
            console.error("Failed to save new password:", err);
            setError("Failed to change password. Please try again.");
            setSuccess("");
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
            <div className="w-[1200px] h-[650px] transform -translate-x-1/2 -translate-y-1/2 left-[50%] flex top-[50%] m-auto backdrop-blur-lg bg-[#A5A5A538] p-6 rounded-lg absolute">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <Image width={180} height={180} src={Logo_img} alt="Logo" />
                </div>

                <div className="w-1/2 h-full flex justify-center items-center">
                    <div className="w-[480px] h-[480px] rounded-3xl ml-16 p-10 bg-white">
                        <div>
                            <h1 className="font-extrabold text-2xl text-black">Forgot Password</h1>
                            <p className="text-[14px] text-[#7F7F7F]">
                                Enter your email to receive a password reset link
                            </p>
                        </div>

                        {!isOtpSubmitted ? (
                            <div className="flex flex-col gap-4 w-100">
                                <div className="mt-4 text-black">
                                    <label className="font-semibold text-sm" htmlFor="email">Email Address</label>
                                    <input
                                        id="email"
                                        className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {success && <div className="text-green-500 text-sm">{success}</div>}
                                {error && <div className="text-red-500 text-sm">{error}</div>}

                                <div
                                    className="w-100 flex justify-center px-5 font-[700] py-2 rounded-lg bg-[#199FB1] text-white cursor-pointer items-center"
                                    onClick={handlePasswordReset}
                                >
                                    Send Reset Link
                                </div>

                                {otp && (
                                    <div className="flex flex-col w-100 justify-center items-center">
                                        <div className="mt-4 flex flex-col items-center">
                                            <label className="font-semibold text-sm text-black mb-2" htmlFor="otp">
                                                Enter OTP
                                            </label>
                                            <input
                                                id="otp"
                                                className="w-[30%] px-3 h-10 border border-[#7F7F7F] rounded-lg text-center text-black"
                                                type="text"
                                                value={otp}
                                                readOnly
                                            />
                                        </div>

                                        <div
                                            className="w-fit px-5 font-[700] py-2 rounded-lg bg-[#199FB1] text-white cursor-pointer mt-4"
                                            onClick={submitOtp}
                                        >
                                            Submit OTP
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Content to show after OTP is successfully submitted
                            <div className="flex flex-col gap-4">
                                <div className="mt-4 text-black">
                                    <label className="font-semibold text-sm" htmlFor="newPassword">New Password</label>
                                    <input
                                        id="newPassword"
                                        className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg cursor-pointer text-black"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mt-4 text-black">
                                    <label className="font-semibold text-sm" htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        id="confirmPassword"
                                        className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg cursor-pointer text-black"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                {error && <div className="text-red-500 text-sm">{error}</div>}
                                {success && <div className="text-green-500 text-sm">{success}</div>}

                                <div
                                    className="w-fit px-5 font-[700] py-2 rounded-lg bg-[#199FB1] text-white cursor-pointer mt-4"
                                    onClick={handleSaveNewPassword}
                                >
                                    Save New Password
                                </div>
                            </div>
                        )}


                        <div className="text-[#7CB5EC] cursor-pointer pt-10 w-100 flex justify-center" onClick={() => router.push("/auth/login")}>
                            Back to Login
                        </div>

                        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-[50%] top-[50%]">
                            <Image src={Line_img} height={560} alt="Line" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
