import React, { useState, useEffect } from "react";
import Image from "next/image";
import DummyData from "@/app/screen/refreall.json";
import filter from "@/public/assets/filterIcon.svg";
import more from "@/public/assets/moreIcon.svg";
import prev from "@/public/assets/prev.svg";
import next from "@/public/assets/nextIcon.svg";

const Reffral: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    setData(DummyData);
  }, [DummyData]);

  const filteredData = data.filter(
    (item) =>
      item.refrral_id?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.refrral_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.reffral_date?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchText.toLowerCase())
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

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-400";
      case "Rejected":
        return "bg-red-400";
      case "Pending":
        return "bg-yellow-400";
      default:
        return "";
    }
  };

  return (
    <div className="w-full mt-4 bg-white py-4 px-3 rounded-2xl">
      <div className="flex justify-between items-center mb-7 relative">
        <div className="ml-4">
          <h2 className="text- font-bold text-black">Referral History</h2>
        </div>
      </div>

      {showFilters && <div className="">{/* pop up box for filter */}</div>}

      <span className="text-sm text-gray-400 absolute top-[22%]">
        Showing 8 of 877 total Radings
      </span>
      <table className="w-full">
        <thead>
          <tr className=" border-b-2 border-sky-400 text-black">
            <th className="p-2 text-left">
              <input type="checkbox" className="w-4 h-4" />
            </th>
            <th className="p-2 text-left font-light">Referral ID</th>
            <th className="p-2 text-left font-light">Referrer Name</th>
            <th className="p-2 text-left font-light">Refree Name</th>
            <th className="p-2 text-left font-light">Referral Date</th>
            <th className="p-2 pl-5 text-left font-light">Status</th>
            <th className="p-2  font-light text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1 flex">
              <div><br /></div>
            </td>
          </tr>
          {currentItems.map((item, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-gray-100 border-b border-gray-400"
                  : "bg-white border-b border-gray-400"
              }
            >
              <td className="p-2 py-4">
                <input type="checkbox" className="w-4 h-4" />
              </td>
              <td className="p-2 py-4 flex items-center gap-3 font-semibold text-sm text-black">
                {item.refrral_id}
              </td>
              <td className="p-2 py-4 text-gray-400 text-sm">
                {item.refrral_name}
              </td>
              <td className="p-2 py-4 text-gray-400 text-sm">
                {item.refree_name}
              </td>
              <td className="p-2 py-4 text-gray-400 text-sm">
                {item["reffral_date"]}
              </td>
              <td className="p-2 py-4 text-gray-400 text-sm">
                {" "}
                <button
                  className={` px-3 py-1 rounded w-20 text-black ${getStatusClass(
                    item.status
                  )}`}
                >
                  {item.status}
                </button>
              </td>
              <td className="p-2 py-4 flex justify-center">
                <Image
                  src={more}
                  alt="more Icon"
                  width={24}
                  height={24}
                  className=" cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">Delete</p>
        <div className="flex items-center gap-1">
          <span className="text-gray-400 text-sm">Displaying page</span>
          <button className="border px-3 py-[2px] rounded-lg ">First</button>
          <div className="flex items-center border rounded-lg">
            <Image
              src={prev}
              alt="prev Icon"
              width={10}
              height={10}
              className={`cursor-pointer mx-2  ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => paginate(currentPage - 1)}
            />

            {Array.from({
              length: Math.ceil(filteredData.length / itemsPerPage),
            }).map((_, index) => (
              <button
                key={index}
                className={`px-4 py-[2px] ${
                  currentPage === index + 1
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
              className={`cursor-pointer mx-2 ${
                currentPage === totalPages
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
  );
};

export default Reffral;
