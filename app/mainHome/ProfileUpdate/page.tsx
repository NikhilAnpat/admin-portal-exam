"use client";

import bg_img from "../../../public/asset/background.svg";
import Image from "next/image";
import Camera from "../../../public/asset/camera.svg";
import { useState, useEffect } from "react";
import apiClient from "@/app/config";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const ProfileUpdate = () => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<any>({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        image: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem("token");
                console.log("Token fetch profile:", token);

                if (!token) {
                    throw new Error("Unauthorized: Token is missing");
                }

                const response = await apiClient.get("/admin/getProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.data;
                console.log("Profile Data:", data);

                setFormData({
                    fullName: data.fullName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    password: data.password || "",
                    image: data.image || "",
                });
                sessionStorage.setItem("imageURL", data.image);


            } catch (err: unknown) {
                console.error("Error fetching profile data:", err);

                if (err instanceof AxiosError) {
                    console.error("AxiosError:", err);
                    setError(
                        err.response?.data?.message || "Failed to fetch user data. Please try again."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);


    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Unauthorized: Token is missing");
            }
            const response = await apiClient.put("/admin/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            router.push('/mainHome/home')

            console.log("Profile updated:", response.data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error instanceof AxiosError) {
                console.error("Error updating profile:", error);
                alert(error.response?.data?.message || "Error updating profile. Please try again.");
            } else {
                console.error("Unexpected error:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="text-lg font-semibold text-[#199FB1]">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="text-red-500 font-bold">{error}</div>
            </div>
        );
    }

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
                <div className="w-[60%] py-5 px-20 h-[90%] transform -translate-x-1/2 -translate-y-1/2 left-[50%] flex-col rounded-xl top-[50%] bg-white absolute flex justify-start gap-5 items-center">
                    <div className="flex flex-col gap-4">
                        {formData.image ? (
                            <div className="text-center flex items-center pl-[15px]">
                                <Image
                                    src={formData.image}
                                    alt="Profile Picture"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover h-[100px] w-[100px]"
                                />
                            </div>

                        ) : (
                            <div className="bg-[#D9D9D9] p-7 w-fit rounded-full justify-center items-center">
                                <Image src={Camera} alt="Camera Icon" />
                            </div>
                        )}
                        <div className="text-[#199FB1]">Upload Profile Picture</div>
                    </div>


                    <div className="w-[75%]">
                        <div className="flex flex-col gap-2 -mt-8 text-black">
                            {/* Full Name */}
                            <div className="mt-6">
                                <label
                                    className="font-semibold text-[#7F7F7F] text-sm"
                                    htmlFor="fullName"
                                >
                                    Your Name
                                </label>
                                <input
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg"
                                    type="text"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    className="font-semibold text-[#7F7F7F] text-sm"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg"
                                    type="email"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label
                                    className="font-semibold text-[#7F7F7F] text-sm"
                                    htmlFor="phone"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg"
                                    type="tel"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label className="font-semibold text-[#7F7F7F] text-sm" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-3 h-10 border border-[#7F7F7F] rounded-lg pr-10"
                                        type={showPassword ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center text-[#7F7F7F]"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <div className="text-[#7F7F7F] text-center mt-2">
                                    Change Password
                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    className="text-white px-8 py-1 text-lg text-center rounded-lg font-bold bg-[#199FB1]"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;
