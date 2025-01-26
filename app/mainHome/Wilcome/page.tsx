"use client"; // Ensures this is a client-side rendered component
import { useRouter } from "next/router";
import bg_img from "../../../public/asset/background.svg";
import Image from "next/image";
import Logo_img from "../../../public/asset/logo.svg";

const Page = () => {
  const router = useRouter(); // Use the router hook

  const handleGetStarted = () => {
    router.push("/mainHome/ProfileUpdate"); // Navigate to another route
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
        <div className="w-[60%] p-20 h-[90%] transform -translate-x-1/2 -translate-y-1/2 left-[50%] flex-col rounded-xl top-[50%] bg-white absolute flex justify-start gap-5 items-center">
          <div>
            <Image width={150} height={150} src={Logo_img} alt="Logo" />
          </div>
          <div className="flex justify-center items-center flex-col">
            <div className="text-4xl font-bold">Welcome</div>
            <div className="text-[#FF8553] font-bold text-2xl">
              to the Free Shops App Admin Panel
            </div>
          </div>

          <div className="text-center text-[#7F7F7F]">
            Manage and monitor all aspects of your app seamlessly from one
            place. Use the tools below to get started.
          </div>

          <div
            onClick={handleGetStarted}
            className="font-bold mt-3 px-4 py-1 rounded-lg text-white bg-[#199FB1]"
          >
            Get Started
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
