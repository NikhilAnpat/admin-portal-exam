"use client";
import { useEffect, useState } from "react";
import Dashboard from "../../screen/dashboard";
import UserManagement from "@/app/screen/userMangment";
import RatingReview from "@/app/screen/ratingReview";
import Settings from "@/app/screen/settings";
import History from "@/app/screen/history";
import PushNotification from "@/app/screen/pushNotifications";
import AllBooking from "@/app/screen/allBookings";
import TransactionList from "@/app/screen/transactionList";
import GoogleAnalytics from "@/app/screen/googleAnalytics";
import GoogleMap from "@/app/screen/googleMap";
import MultiCurrency from "@/app/screen/multiCurrency";
import Category from "@/app/screen/category";
import LiveChatHistory from "@/app/screen/liveChatHistory";
import PackagePlan from "@/app/screen/packagePlan";
import Reffral from "@/app/screen/refral";
import { useRouter } from "next/navigation";
import Image from "next/image";
import notification from '@/public/assets/notification.svg'
import searchIcon from '@/public/assets/searchIcon.svg'

// Define your menu items in an array
const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "userManagement", label: "User Management" },
    { id: "ratingReview", label: "Rating and Review" },
    { id: "settings", label: "Settings" },
    { id: "history", label: "History" },
    { id: "allBookings", label: "All Bookings" },
    { id: "pushNotification", label: "Push Notification" },
    { id: "transactionList", label: "Transaction List" },
    { id: "googleAnalytics", label: "Google Analytics" },
    { id: "multiCurrency", label: "Multi-Currency" },
    { id: "category", label: "Category" },
    { id: "liveChatHistory", label: "Live Chat History" },
    { id: "packagePlan", label: "Package Plan" },
    { id: "referralHistory", label: "Referral History" },
    { id: "googleMap", label: "Google Map" },
];

export default function MainHome() {
    const [selectedMenu, setSelectedMenu] = useState("dashboard");
    const router = useRouter();

    const handleMenuClick = (menu: string) => {
        setSelectedMenu(menu);
    };

    const routerPush = () => {
        router.push('/mainHome/profileScreen')
    }


    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
        const storedImageURL = sessionStorage.getItem("imageURL");
        setImageURL(storedImageURL || '');
        console.log("Stored Image URL:", storedImageURL);
    }, []);

    return (
        <div>
            <div className="relative min-h-screen bg-gray-100 pb-[60px]">
                {/* Background */}
                <div className="absolute inset-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1754 250"
                        className="w-full h-auto"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient
                                id="gradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0%" stopColor="#FF8553" />
                                <stop offset="100%" stopColor="#E25845" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M796.499 200C366.056 280 77.142 250 -23 200V-10H1754V200C1610.13 180 1231.52 150 796.499 200Z"
                            fill="url(#gradient)"
                        />
                    </svg>
                </div>

                {/* Content */}
                <div className="px-24 relative top-[28px] flex">
                    {/* Left Content */}

                    {/* Left Content */}
                    <div className="flex flex-col pb-2 border-b bg-white  z-50 text-[#168D9D] text-center cursor-pointer">
                        <span className="py-3 px-2 pb-2 border-b">Logo</span>
                        {menuItems.map((item) => (
                            <span
                                key={item.id}
                                className={`py-4 px-4 border-b w-[230px] border-t-[1px] relative ${selectedMenu === item.id ? "text-white bg-[#168D9D] py-2  w-[150px] height-[30px]  m-[17px] rounded-2xl" : ""
                                    }`}
                                onClick={() => handleMenuClick(item.id)}
                            >
                                <span className="relative z-10">{item.label}</span>
                            </span>
                        ))}


                    </div>

                    {/* Right Content */}
                    <div className="ml-3 w-full ">
                        {/* Header */}
                        <div className=" flex justify-between mt-3 items-center border-b pb-5">
                            <div className="flex">
                                <input
                                    type="text"
                                    className="bg-white/30 backdrop-blur-none px-3 sm:w-64 outline-none rounded-md text-white"
                                />
                                <Image
                                    src={searchIcon}
                                    alt="notification Icon"
                                    className="m-0 -ml-5"
                                />
                            </div>
                            <div className="flex gap-20 cursor-pointer" onClick={routerPush}>
                                <Image
                                    src={notification}
                                    alt="notification Icon"
                                    width={24}
                                    height={24}
                                />
                                {imageURL ? (
                                    <Image
                                        src={imageURL}
                                        alt="Profile Picture"
                                        width={50}
                                        height={50}
                                        className="rounded-full object-cover h-[40px] w-[40px]"
                                    />
                                ) : (
                                    <div className="bg-green-300 w-9 h-9 rounded-full">
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Content */}
                        <div>
                            {selectedMenu === "dashboard" && <Dashboard />}
                            {selectedMenu === "userManagement" && <UserManagement />}
                            {selectedMenu === "ratingReview" && <RatingReview />}
                            {selectedMenu === "settings" && <Settings />}
                            {selectedMenu === "history" && <History />}
                            {selectedMenu === "allBookings" && <AllBooking />}
                            {selectedMenu === "pushNotification" && <PushNotification />}
                            {selectedMenu === "transactionList" && <TransactionList />}
                            {selectedMenu === "googleAnalytics" && <GoogleAnalytics />}
                            {selectedMenu === "multiCurrency" && <MultiCurrency />}
                            {selectedMenu === "category" && <Category />}
                            {selectedMenu === "liveChatHistory" && <LiveChatHistory />}
                            {selectedMenu === "packagePlan" && <PackagePlan />}
                            {selectedMenu === "referralHistory" && <Reffral />}
                            {selectedMenu === "googleMap" && <GoogleMap />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
