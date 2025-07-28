import { useState } from "react";
import Chart from "../components/Chart";

export default function Reports() {
  const [selected, setSelected] = useState<"weekly" | "monthly" | "yearly">(
    "monthly",
  );

  return (
    <div>
      {/* tab selection */}
      <div className="w-full flex justify-around bg-[#F2F5F2] rounded-md">
        <button
          onClick={() => {
            setSelected("weekly");
          }}
          className={`text-[#6E8566] py-1.5 my-1 px-12 rounded-lg text-xs font-medium ${selected === "weekly" && "bg-white text-black"}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setSelected("monthly")}
          className={`text-[#6E8566] py-1.5 my-1 px-12 rounded-lg text-xs font-medium ${selected === "monthly" && "bg-white text-black"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setSelected("yearly")}
          className={`text-[#6E8566] py-1.5 my-1 px-12 rounded-lg text-xs font-medium ${selected === "yearly" && "bg-white text-black"}`}
        >
          Yearly
        </button>
      </div>

      {/* spend by category */}
      <div className="mt-6 p-6 border border-[#DEE3DB] rounded-md shadow-xs">
        <p className="text-sm text-gray-800 font-semibold">
          Spending By Category
        </p>
        <p className="text-3xl font-bold mt-2.5">$1,250</p>
        <p className="text-gray-400 mt-2 text-sm">
          This Month <span className="text-green-800 font-medium">+12%</span>
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col gap-2 items-center">
            <div className="h-28 w-12 bg-[#F2F5F2] border-t-4"></div>
            <p className="text-xs  font-semibold text-gray-500">Food</p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className="h-28 w-20 bg-[#F2F5F2] border-t-8"></div>
            <p className="text-xs  font-semibold text-gray-500">
              Entertainment
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className="h-32 w-10 bg-[#F2F5F2] border-t-2"></div>
            <p className="text-xs  font-semibold text-gray-500">Utilities</p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className="h-28 w-10 bg-[#F2F5F2] border-t-4"></div>
            <p className="text-xs  font-semibold text-gray-500">Transport</p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className="h-28 w-16 bg-[#F2F5F2] border-t-4"></div>
            <p className="text-xs  font-semibold text-gray-500">Others</p>
          </div>
        </div>
      </div>

      {/* spending trend */}
      <div className="mt-6 p-6 h-72 border border-[#DEE3DB] rounded-md shadow-xs">
        <p className="text-sm text-gray-800 font-semibold">Spending Trend</p>
        <p className="text-3xl font-bold mt-2.5">$1,250</p>
        <p className="text-gray-400 mt-2 text-sm">
          Last 6 Months <span className="text-red-600 font-medium"> -6%</span>
        </p>

        <div className="mt-12">
          <Chart />
        </div>
      </div>
    </div>
  );
}
