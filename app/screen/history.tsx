import React, { useState, useEffect } from "react";
import Image from "next/image";
import dummyData from "@/app/screen/HistoryUserData.json";
import filter from "@/public/assets/filterIcon.svg";
import more from "@/public/assets/moreIcon.svg";
import prev from "@/public/assets/prev.svg";
import next from "@/public/assets/nextIcon.svg";

interface ActivityHistoryData {
    user: string;
    action: string;
    "date & time": string;
    result: string;
}

const ActivityHistory: React.FC = () => {
    const [data, setData] = useState<ActivityHistoryData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

    useEffect(() => {
        setData(dummyData);
    }, []);

    const filteredData = data.filter((item) =>
        item.user.toLowerCase().includes(searchText.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData
        .filter((item) => selectedUsers.size === 0 || selectedUsers.has(item.user))
        .slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginate = (pageNumber: any) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <div className="w-full mt-4 bg-white py-4 px-3 rounded-2xl">
                <div className="flex justify-between items-center mb-7 ">
                    <div className="ml-4">
                        <h2 className="text- font-bold relative text-black">Activity History</h2>
                        <p className="text-gray-400">
                            View historical data of actions taking within the app.
                        </p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search by user, date, or activity type"
                                className=" outline-none px-3 py-2 border w-80 bg-gray-200 rounded-md border-gray-500 text-sm"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button className="m-0 -ml-5 px-7 py-1 bg-[#168D9D] text-white rounded-lg text-sm font-semibold">
                                Search
                            </button>
                        </div>
                        <Image
                            src={filter}
                            alt="filter Icon"
                            width={24}
                            height={24}
                            className="mr-3 cursor-pointer"
                            onClick={() => setShowFilters(!showFilters)}
                        />
                    </div>
                </div>

                {showFilters && <div className=""></div>}

                <span className="text-sm text-gray-400 absolute top-[228px]">
                    Showing 8 of 877 total Radings
                </span>
                <table className="w-full text-black">
                    <thead>
                        <tr className=" border-b-2 border-sky-400">
                            <th className="p-2 text-left">
                                <input type="checkbox" className="w-4 h-4" />
                            </th>
                            <th className="p-2 text-left font-light">User</th>
                            <th className="p-2 text-left font-light">Action</th>
                            <th className="p-2 text-left font-light">Date & Time</th>
                            <th className="p-2 text-left font-light">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 flex">
                                <div>
                                    <br />
                                </div>
                            </td>
                        </tr>
                        {currentItems.map((item, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-100 border-b border-gray-400" : "bg-white border-b border-gray-400"}
                            >
                                <td className="p-2">
                                    <input type="checkbox" className="w-4 h-4" />
                                </td>
                                <td className="p-2 flex items-center gap-3 font-semibold text-sm">
                                    <div className=" w-9 h-9 bg-green-300 rounded-full my-1"></div>
                                    {item.user}
                                </td>
                                <td className="p-2 text-gray-400 text-sm">{item.action}</td>
                                <td className="p-2 text-gray-400 text-sm">
                                    {item["date & time"]}
                                </td>
                                <td className="p-2 pl-6">
                                    <Image
                                        src={more}
                                        alt="more Icon"
                                        width={24}
                                        height={24}
                                        className=" cursor-pointer"
                                    //   onClick={handleUser}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center py-4">
                    <p className="text-gray-400 text-sm">Delete</p>
                    <div className="flex items-center gap-1 mr-10">
                        <span className="text-gray-400 text-sm">Displaying page</span>
                        <button className="border px-3 py-[2px] rounded-lg ">First</button>
                        <div className="flex items-center border rounded-lg">
                            <Image
                                src={prev}
                                alt="prev Icon"
                                width={10}
                                height={10}
                                className={`cursor-pointer mx-2  ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => paginate(currentPage - 1)}
                            />

                            {Array.from({
                                length: Math.ceil(filteredData.length / itemsPerPage),
                            }).map((_, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-[2px] border ${currentPage === index + 1
                                            ? "bg-gray-200 text-gray-400"
                                            : "bg-white"
                                        }`}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <Image
                                src={next}
                                alt="next Icon"
                                width={10}
                                height={10}
                                className={`cursor-pointer mx-2 ${currentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                onClick={() => paginate(currentPage + 1)}
                            />
                        </div>
                        <button className="border px-3 py-[2px] rounded-lg ">Last</button>
                    </div>
                </div>
            </div>
            <p className="py-10 text-center font-semibold text-sky-600 cursor-pointer text-sm">Export activity log to CSV</p>
        </div>
    );
};

export default ActivityHistory;
