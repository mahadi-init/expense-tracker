import { IonButton, IonContent, IonPage } from "@ionic/react";
import Wrapper from "../components/Wrapper";
import Toolbar from "../components/Toolbar";
import { useState } from "react";

const Expenses: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    date: "",
    note: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  // Popular expense categories
  const categories = [
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category: string) => {
    handleInputChange("category", category);
    setShowCategories(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Expense submitted:", formData);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getSelectedCategory = () => {
    return categories.find((cat) => cat.name === formData.source);
  };

  return (
    <IonPage>
      <Toolbar title="Expenses" />
      <IonContent fullscreen>
        <Wrapper>
          <div className="min-h-screen py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
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
                Add New Expense
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Track your spending and stay within budget
              </p>
            </div>

            {/* Form Container */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Amount Field */}
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "amount" || formData.amount
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    onFocus={() => setFocusedField("amount")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-4 text-lg font-semibold bg-white dark:bg-gray-800 border-2 rounded-2xl transition-all duration-200 placeholder-gray-400 ${
                      focusedField === "amount"
                        ? "border-red-500 ring-4 ring-red-100 dark:ring-red-900/30 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    } text-gray-900 dark:text-white focus:outline-none`}
                  />
                </div>

                {/* Source Field */}
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "source" || formData.source
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g., Salary, Freelance, Business"
                    value={formData.source}
                    onChange={(e) =>
                      handleInputChange("source", e.target.value)
                    }
                    onFocus={() => setFocusedField("source")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border-2 rounded-2xl transition-all duration-200 placeholder-gray-400 ${
                      focusedField === "source"
                        ? "border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    } text-gray-900 dark:text-white focus:outline-none`}
                  />
                </div>

                {/* Date Field */}
                <div className="relative">
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
                      focusedField === "date" || formData.date
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="date"
                    value={formData.date || getCurrentDate()}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    onFocus={() => setFocusedField("date")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border-2 rounded-2xl transition-all duration-200 ${
                      focusedField === "date"
                        ? "border-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    } text-gray-900 dark:text-white focus:outline-none`}
                  />
                </div>

                {/* Note Field */}
                <div className="relative">
                  <div
                    className={`absolute left-4 top-4 transition-colors duration-200 ${
                      focusedField === "note" || formData.note
                        ? "text-orange-500"
                        : "text-gray-400"
                    }`}
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
                  </div>
                  <textarea
                    placeholder="What did you spend on? (optional)"
                    rows={4}
                    value={formData.note}
                    onChange={(e) => handleInputChange("note", e.target.value)}
                    onFocus={() => setFocusedField("note")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border-2 rounded-2xl transition-all duration-200 placeholder-gray-400 resize-none ${
                      focusedField === "note"
                        ? "border-orange-500 ring-4 ring-orange-100 dark:ring-orange-900/30 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    } text-gray-900 dark:text-white focus:outline-none`}
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Quick amounts:
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 25, 50, 100].map((amount) => (
                      <IonButton
                        key={amount}
                        type="button"
                        shape="round"
                        size="small"
                        onClick={() =>
                          handleInputChange("amount", amount.toString())
                        }
                      >
                        ${amount}
                      </IonButton>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <IonButton type="submit" color={"success"} className="w-full">
                  <div className="flex items-center justify-center space-x-2">
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Expense</span>
                  </div>
                </IonButton>

                {/* Alternative Actions */}
                <div className="flex space-x-3 pt-4">
                  <IonButton
                    type="button"
                    onClick={() =>
                      setFormData({
                        amount: "",
                        source: "",
                        date: "",
                        note: "",
                      })
                    }
                    color={"danger"}
                    className="w-full"
                  >
                    Clear Form
                  </IonButton>
                  <IonButton type="button" className="w-full">
                    Save & Add Another
                  </IonButton>
                </div>
              </form>
            </div>

            {/* Spending Tip */}
            <div className="max-w-md mx-auto mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl border border-amber-100 dark:border-amber-800">
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                    Smart Spending
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Track every expense to identify spending patterns and find
                    opportunities to save money.
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

export default Expenses;
