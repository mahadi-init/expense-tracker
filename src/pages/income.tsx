export default function Income() {
  return (
    <div className="flex gap-8 flex-col">
      <input
        placeholder="Amount"
        className="py-6 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px]"
      />

      <input
        placeholder="Source"
        className="py-6 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px]"
      />

      <input
        placeholder="Date"
        className="py-6 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px]"
      />

      <input className="py-24 px-4 bg-[#F2F5F2] w-full border-[#6E8566] rounded-md broder-[2px]" />

      <button className="w-full bg-green-600 py-4 font-semibold  rounded-md">
        Save
      </button>
    </div>
  );
}
