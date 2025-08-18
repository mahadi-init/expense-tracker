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

type Expense = {
  id: number;
  amount: number;
  source: string;
  date: string;
  note?: string;
  createdAt: string;
};

// Mock data - replace with your actual API fetcher
const mockExpenses = [
  {
    id: 1,
    amount: 85.5,
    source: "Food & Dining",
    date: "2025-08-18",
    note: "Dinner at Italian restaurant with family",
    createdAt: "2025-08-18T19:30:00Z",
  },
  {
    id: 2,
    amount: 45.0,
    source: "Transportation",
    date: "2025-08-18",
    note: "Gas for the week",
    createdAt: "2025-08-18T14:15:00Z",
  },
  {
    id: 3,
    amount: 120.0,
    source: "Shopping",
    date: "2025-08-17",
    note: "New work clothes",
    createdAt: "2025-08-17T16:20:00Z",
  },
  {
    id: 4,
    amount: 25.0,
    source: "Entertainment",
    date: "2025-08-16",
    note: "Movie tickets",
    createdAt: "2025-08-16T20:45:00Z",
  },
  {
    id: 5,
    amount: 350.0,
    source: "Bills & Utilities",
    date: "2025-08-15",
    note: "Monthly electricity bill",
    createdAt: "2025-08-15T10:00:00Z",
  },
  {
    id: 6,
    amount: 75.0,
    source: "Healthcare",
    date: "2025-08-14",
    note: "Doctor consultation",
    createdAt: "2025-08-14T11:30:00Z",
  },
  {
    id: 7,
    amount: 200.0,
    source: "Education",
    date: "2025-08-12",
    note: "Online course subscription",
    createdAt: "2025-08-12T09:15:00Z",
  },
  {
    id: 8,
    amount: 1200.0,
    source: "Travel",
    date: "2025-08-10",
    note: "Weekend trip to the mountains",
    createdAt: "2025-08-10T08:00:00Z",
  },
];

type SortOption = "date" | "amount" | "source";
type SortOrder = "asc" | "desc";

// Category data matching your expense form
const categoryData = [
  { name: "Food & Dining", icon: "🍽️", color: "bg-orange-500" },
  { name: "Transportation", icon: "🚗", color: "bg-blue-500" },
  { name: "Shopping", icon: "🛒", color: "bg-purple-500" },
  { name: "Entertainment", icon: "🎬", color: "bg-pink-500" },
  { name: "Bills & Utilities", icon: "⚡", color: "bg-yellow-500" },
  { name: "Healthcare", icon: "🏥", color: "bg-green-500" },
  { name: "Education", icon: "📚", color: "bg-indigo-500" },
  { name: "Travel", icon: "✈️", color: "bg-cyan-500" },
  { name: "Other", icon: "📝", color: "bg-gray-500" },
];

const ExpenseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");

  // Replace with your actual SWR fetcher
  const {
    data: expenses = mockExpenses,
    error,
    mutate,
    isLoading,
  } = useSWR(
    "/expenses/list",
    () => Promise.resolve(mockExpenses), // Replace with your actual fetcher
    { refreshInterval: 0 },
  );

  // Get unique categories for filter dropdown
  const uniqueCategories = useMemo(() => {
    const categories = [...new Set(expenses.map((expense) => expense.source))];
    return categories.sort();
  }, [expenses]);

  // Filter expenses by date range
  const filterByDateRange = (expense: Expense) => {
    const expenseDate = new Date(expense.date);
    const today = new Date();

    switch (dateRange) {
      case "today":
        return expenseDate.toDateString() === today.toDateString();
      case "week":
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return expenseDate >= weekAgo;
      case "month":
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return expenseDate >= monthAgo;
      case "year":
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        return expenseDate >= yearAgo;
      default:
        return true;
    }
  };

  // Filter and sort expenses
  const filteredAndSortedExpenses = useMemo(() => {
    let filtered = expenses.filter((expense) => {
      const matchesSearch =
        expense.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.amount.toString().includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || expense.source === selectedCategory;
      const matchesDate = filterByDateRange(expense);
      return matchesSearch && matchesCategory && matchesDate;
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
  }, [expenses, searchTerm, selectedCategory, dateRange, sortBy, sortOrder]);

  // Calculate totals and insights
  const { totalExpenses, categoryBreakdown, averageExpense } = useMemo(() => {
    const total = filteredAndSortedExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    const average =
      filteredAndSortedExpenses.length > 0
        ? total / filteredAndSortedExpenses.length
        : 0;

    const breakdown = filteredAndSortedExpenses.reduce(
      (acc, expense) => {
        acc[expense.source] = (acc[expense.source] || 0) + expense.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalExpenses: total,
      categoryBreakdown: breakdown,
      averageExpense: average,
    };
  }, [filteredAndSortedExpenses]);

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

  const getCategoryData = (categoryName: string) => {
    return (
      categoryData.find((cat) => cat.name === categoryName) || {
        name: categoryName,
        icon: "📝",
        color: "bg-gray-500",
      }
    );
  };

  const getTopCategory = () => {
    const sortedCategories = Object.entries(categoryBreakdown).sort(
      ([, a], [, b]) => b - a,
    );
    return sortedCategories[0] || ["", 0];
  };

  if (isLoading) {
    return (
      <IonPage>
        <Toolbar title="Expense List" />
        <IonContent>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading expenses...
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
        <Toolbar title="Expense List" />
        <IonContent>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400">
                Error loading expenses
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

  const [topCategoryName, topCategoryAmount] = getTopCategory();

  return (
    <IonPage>
      <Toolbar title="Expense List" />
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <Wrapper>
          <div className="min-h-screen py-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl mb-6 shadow-lg">
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
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Expense History
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Track and manage your spending patterns
              </p>
            </div>

            {/* Summary Cards */}
            <div className="max-w-4xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Expenses */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(totalExpenses)}
                    </p>
                    <p className="text-red-100 text-sm">
                      {filteredAndSortedExpenses.length}{" "}
                      {filteredAndSortedExpenses.length === 1
                        ? "expense"
                        : "expenses"}
                    </p>
                  </div>
                  <div className="text-3xl">💸</div>
                </div>
              </div>

              {/* Average Expense */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Average</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(averageExpense)}
                    </p>
                    <p className="text-blue-100 text-sm">per expense</p>
                  </div>
                  <div className="text-3xl">📊</div>
                </div>
              </div>

              {/* Top Category */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Top Category
                    </p>
                    <p className="text-lg font-bold truncate">
                      {topCategoryName || "No data"}
                    </p>
                    <p className="text-purple-100 text-sm">
                      {topCategoryAmount > 0
                        ? formatCurrency(topCategoryAmount)
                        : "—"}
                    </p>
                  </div>
                  <div className="text-3xl">
                    {topCategoryName
                      ? getCategoryData(topCategoryName).icon
                      : "📝"}
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                      placeholder="Search expenses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
                    />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="all">All Categories</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Date Range Filter */}
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="year">Last Year</option>
                  </select>

                  {/* Sort By */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="source">Sort by Category</option>
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

            {/* Expense List */}
            <div className="max-w-4xl mx-auto">
              {filteredAndSortedExpenses.length === 0 ? (
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
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    No expenses found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchTerm ||
                    selectedCategory !== "all" ||
                    dateRange !== "all"
                      ? "Try adjusting your filters"
                      : "Start tracking your expenses to see records here"}
                  </p>
                  <IonButton routerLink="/expenses/add" color="danger">
                    Add Your First Expense
                  </IonButton>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedExpenses.map((expense) => {
                    const categoryInfo = getCategoryData(expense.source);
                    return (
                      <div
                        key={expense.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            {/* Category Icon */}
                            <div
                              className={`w-12 h-12 ${categoryInfo.color} rounded-xl flex items-center justify-center text-white text-xl shadow-md`}
                            >
                              {categoryInfo.icon}
                            </div>

                            {/* Expense Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                  {expense.source}
                                </h3>
                                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                  -{formatCurrency(expense.amount)}
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
                                  <span>{formatDate(expense.date)}</span>
                                </div>
                              </div>

                              {expense.note && (
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                  {expense.note}
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
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add New Expense Button */}
            <div className="max-w-4xl mx-auto mt-8">
              <IonButton
                routerLink="/expenses/add"
                color="danger"
                className="w-full"
                size="large"
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
                  <span>Add New Expense</span>
                </div>
              </IonButton>
            </div>

            {/* Spending Insights */}
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl border border-amber-100 dark:border-amber-800">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-800/50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-amber-600 dark:text-amber-400"
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
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Spending Insights
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {Object.keys(categoryBreakdown).length > 0
                      ? `You've spent the most on ${topCategoryName} (${formatCurrency(topCategoryAmount)}). Consider tracking if this aligns with your budget priorities.`
                      : "Start tracking expenses to get personalized insights about your spending patterns."}
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

export default ExpenseList;
