import { IonContent, IonPage } from "@ionic/react";
import Wrapper from "../components/Wrapper";
import Toolbar from "../components/Toolbar";
import get from "../https/get";
import useSWR from "swr";
import { DashboardStats } from "../types/dashboard";

// Skeleton component for reusable loading states
const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
  ></div>
);

const LoadingSkeleton = () => (
  <Wrapper>
    <div className="space-y-8 pb-8">
      {/* Current Balance Skeleton */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 p-8 shadow-2xl">
        <div className="relative z-10">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-10 w-48 mb-4" />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
      </div>

      {/* Daily Overview Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Skeleton className="w-1 h-8 rounded-full mr-3" />
          <Skeleton className="h-8 w-36" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Daily Income Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-8 w-24" />
          </div>

          {/* Daily Expenses Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-8 w-28" />
          </div>
        </div>

        {/* Daily Net Skeleton */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-9 w-32" />
            </div>
            <Skeleton className="w-16 h-16 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Monthly Overview Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center">
          <Skeleton className="w-1 h-8 rounded-full mr-3" />
          <Skeleton className="h-8 w-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Monthly Income Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-28 mb-1" />
            <Skeleton className="h-8 w-32" />
          </div>

          {/* Monthly Expenses Skeleton */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-8 w-36" />
          </div>
        </div>

        {/* Monthly Net Skeleton */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-4 w-20 mb-1" />
              <Skeleton className="h-9 w-36" />
            </div>
            <Skeleton className="w-16 h-16 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Monthly Cost Summary Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="text-center">
          <Skeleton className="w-16 h-16 rounded-2xl mb-4 mx-auto" />
          <Skeleton className="h-6 w-40 mb-2 mx-auto" />
          <Skeleton className="h-10 w-48 mb-2 mx-auto" />
          <Skeleton className="h-4 w-36 mx-auto" />
        </div>
      </div>
    </div>
  </Wrapper>
);

const Home: React.FC = () => {
  const { data, isLoading } = useSWR("/dashboard/stats", async () => {
    const data = await get<DashboardStats>("/dashboard/stats");
    return data.data;
  });

  if (!data || isLoading) {
    return (
      <IonPage>
        <Toolbar title="Home" />
        <IonContent fullscreen>
          <LoadingSkeleton />
        </IonContent>
      </IonPage>
    );
  }

  const currentBalance = data.total.total_income - data.total.total_expense;
  const monthlyIncome = data.monthlyDashboard.income;
  const monthlyExpenses = data.monthlyDashboard.expenses;
  const dailyIncome = data.dailyDashboard.income;
  const dailyExpenses = data.dailyDashboard.expenses;

  return (
    <IonPage>
      <Toolbar title="Home" />
      <IonContent fullscreen>
        <Wrapper>
          <div className="space-y-8 pb-8">
            {/* Current Balance - Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
              <div className="relative z-10">
                <p className="text-lg font-medium text-blue-100 mb-2">
                  Current Balance
                </p>
                <p
                  className={`text-4xl font-bold mb-4 ${currentBalance >= 0 ? "text-green-300" : "text-red-300"}`}
                >
                  ${Math.abs(currentBalance).toLocaleString()}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-blue-100">
                      Income: ${data.total.total_income.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-sm text-blue-100">
                      Expenses: ${data.total.total_expense.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                Daily Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Daily Income */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                      Today
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Daily Income
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${dailyIncome.toLocaleString()}
                  </p>
                </div>

                {/* Daily Expenses */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                      <svg
                        className="w-6 h-6 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                      Today
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Daily Expenses
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${dailyExpenses.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Daily Net */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Daily Net
                    </p>
                    <p
                      className={`text-3xl font-bold ${data.dailyDashboard.net >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      ${Math.abs(data.dailyDashboard.net).toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${data.dailyDashboard.net >= 0 ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                  >
                    {data.dailyDashboard.net >= 0 ? (
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-8 h-8 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                Monthly Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Monthly Income */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                      {data.month}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Monthly Income
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${monthlyIncome.toLocaleString()}
                  </p>
                </div>

                {/* Monthly Expenses */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <svg
                        className="w-6 h-6 text-orange-600 dark:text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                      {data.month}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Monthly Expenses
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${monthlyExpenses.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Monthly Net */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Monthly Net
                    </p>
                    <p
                      className={`text-3xl font-bold ${data.monthlyDashboard.net >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      ${Math.abs(data.monthlyDashboard.net).toLocaleString()}
                    </p>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${data.monthlyDashboard.net >= 0 ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                  >
                    {data.monthlyDashboard.net >= 0 ? (
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-8 h-8 text-red-600 dark:text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Cost Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Current Month Total
                </h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  ${data.monthlyCost.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total expenses this month
                </p>
              </div>
            </div>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default Home;
