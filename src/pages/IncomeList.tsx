import {
  IonButton,
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import Wrapper from "../components/Wrapper";
import Toolbar from "../components/Toolbar";
import { useState, useMemo } from "react";
import useSWR from "swr";

type Income = {
  id: number;
  amount: number;
  source: string;
  date: string;
  note?: string;
  createdAt: string;
};

// Mock data - replace with your actual API fetcher
const mockIncomes: Income[] = [
  {
    id: 1,
    amount: 5000,
    source: "Salary",
    date: "2025-08-15",
    note: "Monthly salary payment",
    createdAt: "2025-08-15T10:00:00Z",
  },
  {
    id: 2,
    amount: 1200,
    source: "Freelance",
    date: "2025-08-12",
    note: "Web development project",
    createdAt: "2025-08-12T14:30:00Z",
  },
  {
    id: 3,
    amount: 300,
    source: "Investment",
    date: "2025-08-10",
    note: "Stock dividends",
    createdAt: "2025-08-10T09:15:00Z",
  },
  {
    id: 4,
    amount: 800,
    source: "Side Business",
    date: "2025-08-08",
    note: "Online course sales",
    createdAt: "2025-08-08T16:45:00Z",
  },
  {
    id: 5,
    amount: 150,
    source: "Rental",
    date: "2025-08-05",
    note: "Property rental income",
    createdAt: "2025-08-05T11:20:00Z",
  },
];

type SortOption = "date" | "amount" | "source";
type SortOrder = "asc" | "desc";

const IncomeList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  // Replace with your actual SWR fetcher
  const {
    data: incomes = mockIncomes,
    error,
    mutate,
    isLoading,
  } = useSWR(
    "/income/list",
    () => Promise.resolve(mockIncomes), // Replace with your actual fetcher
    { refreshInterval: 0 },
  );

  // Get unique sources for filter dropdown
  const uniqueSources = useMemo(() => {
    const sources = [...new Set(incomes.map((income) => income.source))];
    return sources.sort();
  }, [incomes]);

  // Filter and sort incomes
  const filteredAndSortedIncomes = useMemo(() => {
    const filtered = incomes.filter((income) => {
      const matchesSearch =
        income.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        income.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        income.amount.toString().includes(searchTerm);
      const matchesSource =
        selectedSource === "all" || income.source === selectedSource;
      return matchesSearch && matchesSource;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "source":
          comparison = a.source.localeCompare(b.source);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [incomes, searchTerm, selectedSource, sortBy, sortOrder]);

  // Calculate total
  const totalIncome = useMemo(() => {
    return filteredAndSortedIncomes.reduce(
      (sum, income) => sum + income.amount,
      0,
    );
  }, [filteredAndSortedIncomes]);

  const handleRefresh = async (event: CustomEvent) => {
    await mutate();
    event.detail.complete();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getSourceIcon = (source: string) => {
    const iconMap: { [key: string]: string } = {
      Salary: "💼",
      Freelance: "🏗️",
      Investment: "📈",
      "Side Business": "🚀",
      Rental: "🏠",
      Bonus: "🎁",
      Commission: "🤝",
      Other: "💰",
    };
    return iconMap[source] || "💰";
  };

  if (isLoading) {
    return (
      <IonPage>
        <Toolbar title="Income List" />
        <IonContent>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading incomes...
              </p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <Toolbar title="Income List" />
        <IonContent>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400">
                Error loading incomes
              </p>
              <IonButton onClick={() => mutate()} className="mt-4">
                Retry
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <Toolbar title="Income List" />
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <Wrapper>
          <div className="min-h-screen py-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
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
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Income History
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                View and manage your income records
              </p>
            </div>

            {/* Total Income Card */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Total Income
                    </p>
                    <p className="text-3xl font-bold">
                      {formatCurrency(totalIncome)}
                    </p>
                    <p className="text-green-100 text-sm">
                      {filteredAndSortedIncomes.length}{" "}
                      {filteredAndSortedIncomes.length === 1
                        ? "record"
                        : "records"}
                    </p>
                  </div>
                  <div className="text-4xl">📊</div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search incomes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Source Filter */}
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="all">All Sources</option>
                    {uniqueSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="source">Sort by Source</option>
                  </select>

                  {/* Sort Order */}
                  <button
                    type="button"
                    onClick={() =>
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="flex items-center justify-center px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-white"
                  >
                    <svg
                      className={`w-5 h-5 transform transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                    <span className="ml-2">
                      {sortOrder === "asc" ? "Asc" : "Desc"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Income List */}
            <div className="max-w-4xl mx-auto">
              {filteredAndSortedIncomes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-12 h-12 text-gray-400"
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
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    No incomes found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm || selectedSource !== "all"
                      ? "Try adjusting your filters"
                      : "Start tracking your income to see records here"}
                  </p>
                  <IonButton routerLink="/income/add" color="success">
                    Add Your First Income
                  </IonButton>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedIncomes.map((income) => (
                    <div
                      key={income.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          {/* Source Icon */}
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                            {getSourceIcon(income.source)}
                          </div>

                          {/* Income Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {income.source}
                              </h3>
                              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {formatCurrency(income.amount)}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                              <div className="flex items-center space-x-1">
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span>{formatDate(income.date)}</span>
                              </div>
                            </div>

                            {income.note && (
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {income.note}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Income Button */}
            <div className="max-w-4xl mx-auto mt-8">
              <IonButton
                routerLink="/income"
                color="success"
                className="w-full"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Add New Income</span>
                </div>
              </IonButton>
            </div>

            {/* Summary Card */}
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                    Income Insights
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Regular income tracking helps you understand your earning
                    patterns and plan for financial goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default IncomeList;
