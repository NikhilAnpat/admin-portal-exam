'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/app/config";
import { AxiosError } from "axios";

const Profile = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        image: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Unauthorized: Token is missing");
                }

                const response = await apiClient.get("/admin/getProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = response.data.data;
                setFormData({
                    fullName: data.fullName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    password: "", 
                    image: data.image || "",
                });
                sessionStorage.setItem("imageURL", data.image);
            } catch (err) {
                console.error("Error fetching profile data:", err);
                if (err instanceof AxiosError) {
                    setError(err.response?.data?.message || "Failed to fetch user data. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const routerPush = () => {
        router.push("/mainHome/home");
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
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert(error.response?.data?.message || "Error updating profile. Please try again.");
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            {/* Background */}
            <div className="absolute inset-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1754 250" className="w-full h-auto" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#FF8553" />
                            <stop offset="100%" stopColor="#E25845" />
                        </linearGradient>
                    </defs>
                    <path d="M796.499 200C366.056 280 77.142 250 -23 200V-10H1754V200C1610.13 180 1231.52 150 796.499 200Z" fill="url(#gradient)" />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center pt-14">
                {/* Profile Picture */}
                <div className="flex w-[50%]">
                    {/* Icon */}
                    <div className="flex w-6 h-6 text-white cursor-pointer" onClick={routerPush}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>

                    {/* Profile Text */}
                    <span className="ml-2 text-white text-sm font-medium">Profile</span>
                </div>

                {/* Form */}
                <div className=" w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                    <div className="relative flex gap-5 items-center">
                        <img
                            src={formData.image || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                        />
                        <button className="mt-2 px-4 py-2 text-sm text-teal-600 border border-teal-600 rounded hover:bg-teal-600 hover:text-white">
                            Upload New Picture
                        </button>
                    </div>

                    <h2 className="text-xl font-semibold mb-4 text-black">Personal Information:</h2>
                    <form className="text-black">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-black">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 cursor-pointer"
                            />
                        </div>

                        <h2 className="text-xl font-semibold mt-8 mb-4">Password Management:</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Old Password</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 cursor-pointer"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">New Password</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 cursor-pointer"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-500 cursor-pointer"
                            />
                        </div>

                        <button type="button" onClick={handleSubmit} className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-500">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
