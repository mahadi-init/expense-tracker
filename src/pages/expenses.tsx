import { Link } from "react-router-dom";

export default function Expenses() {
  return (
    <div className="flex gap-8 flex-col">
      <input
        placeholder="Amount"
        className="py-6 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px]"
      />

      <Link to={"/categories"}>
        <div className="py-6 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px] text-gray-500">
          Category
        </div>
      </Link>

      <input
        placeholder="Date"
        className="py-6 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px]"
      />

      <input className="py-24 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px]" />

      <button className="w-full bg-green-600 py-4 font-semibold  rounded-md">
        Add Expense
      </button>
    </div>
  );
}
