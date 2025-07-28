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
          <p className="font-medium text-gray-700">Total Income</p>
          <p className="font-semibold text-3xl">${data.total_income}</p>
        </div>

        <div className="bg-[#F2F5F2] w-full p-6 space-y-4 rounded-md">
          <p className="font-medium text-gray-700">Total Expenses</p>
          <p className="font-semibold text-3xl">${data.total_expenses}</p>
        </div>
      </div>

      <div className=" mt-6 bg-[#F2F5F2] w-full p-6 space-y-4 rounded-md">
        <p className="font-medium text-gray-700">Current Balance</p>
        <p className="font-semibold text-3xl">${data.balance}</p>
      </div>

      <p className="text-2xl font-bold mt-6">Monthly Overview</p>

      <div>
        <p className="mt-4 text-lg">Income vs. Expenses</p>
        <p className="font-semibold text-4xl mt-2.5">$3200</p>

        <p className="mt-2 text-gray-500 text-lg">Current Month</p>

        <div className="mt-6 flex gap-6 items-center">
          <div className="flex flex-col gap-2 items-center">
            <div className="h-48 w-14 bg-[#F2F5F2] border-t-2"></div>
            <p className="text-md font-medium text-gray-500">Income</p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <div className="h-48 w-14 bg-[#F2F5F2] border-t-4"></div>
            <p className="text-md font-medium text-gray-500">Expenses</p>
          </div>
        </div>
      </div>
    </>
  );
}
