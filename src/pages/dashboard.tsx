export default function Dashboard() {
  const data = {
    total_income: 500,
    total_expenses: 2300,
    balance: 5_500,
  };

  return (
    <>
      <div className="flex items-center w-full gap-4">
        <div className="bg-[#F2F5F2] w-full p-6 space-y-4 rounded-md">
          <p className="font-medium text-gray-700 text-sm">Total Income</p>
          <p className="font-semibold text-2xl">${data.total_income}</p>
        </div>

        <div className="bg-[#F2F5F2] w-full p-6 space-y-4 rounded-md">
          <p className="font-medium text-gray-700 text-sm">Total Expenses</p>
          <p className="font-semibold text-2xl">${data.total_expenses}</p>
        </div>
      </div>

      <div className=" mt-6 bg-[#F2F5F2] w-full p-6 space-y-4 rounded-md">
        <p className="font-medium text-gray-700 text-sm">Current Balance</p>
        <p className="font-semibold text-2xl">${data.balance}</p>
      </div>

      <p className="text-xl font-bold mt-12">Monthly Overview</p>

      <div>
        <p className="font-semibold text-2xl mt-2.5">$3200</p>

        <p className="mt-2 text-gray-500 text-lg">Current Month</p>

        <div className="mt-6 flex gap-6 w-full">
          <div className="flex flex-col gap-2 items-center flex-1/2">
            <div className="h-52 w-full bg-[#F2F5F2] border-t-2"></div>
            <p className="text-md font-medium text-gray-500">Income</p>
          </div>

          <div className="flex flex-col gap-2 items-center flex-1">
            <div className="h-52 w-full bg-[#F2F5F2] border-t-2"></div>
            <p className="text-md font-medium text-gray-500">Expenses</p>
          </div>
        </div>
      </div>
    </>
  );
}
