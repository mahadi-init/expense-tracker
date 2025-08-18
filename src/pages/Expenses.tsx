import { IonButton, IonContent, IonPage } from "@ionic/react";
import Wrapper from "../components/Wrapper";
import Toolbar from "../components/Toolbar";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  ChartBarStacked,
  DollarSign,
  NotebookPen,
} from "lucide-react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import post from "../https/post";

// Zod schema for form validation
const expenseSchema = z.object({
  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
  source: z
    .string({ message: "Category is required" })
    .min(1, "Please select a category"),
  date: z
    .string({ message: "Date is required" })
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
  note: z.string().max(500, "Note must be less than 500 characters").optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const Expenses: React.FC = () => {
  const [showCategories, setShowCategories] = useState(false);
  const { mutate } = useSWRConfig();
  const { trigger } = useSWRMutation(
    "/expenses/add",
    async (url, { arg }: { arg: ExpenseFormData }) => post(url, arg),
  );

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  // Watch form values to determine focus states
  const watchedValues = watch();

  const handleCategorySelect = (category: string) => {
    setValue("source", category, { shouldValidate: true, shouldTouch: true });
    setShowCategories(false);
  };

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      await trigger(data);
      mutate("/dashboard/stats");
      reset();
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  const getSelectedCategory = () => {
    return categories.find((cat) => cat.name === watchedValues.source);
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-blue-500" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("amount", { valueAsNumber: true })}
                    className="w-full pl-12 pr-4 py-4 text-lg font-semibold bg-white dark:bg-gray-800 rounded-2xl transition-all duration-200 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none"
                  />
                  {errors.amount && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* Category Field */}
                <div className="relative">
                  <ChartBarStacked className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-blue-500" />
                  <button
                    type="button"
                    onClick={() => setShowCategories(!showCategories)}
                    className={`w-full pl-12 pr-4 py-4 text-lg text-left bg-white dark:bg-gray-800  rounded-2xl transition-all duration-200 text-gray-900 dark:text-white focus:outline-none`}
                  >
                    {getSelectedCategory() ? (
                      <div className="flex items-center space-x-2">
                        <span>{getSelectedCategory()?.icon}</span>
                        <span>{getSelectedCategory()?.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Select category</span>
                    )}
                  </button>
                  <input type="hidden" {...register("source")} />
                  {errors.source && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.source.message}
                    </p>
                  )}
                </div>

                {/* Category Selection Modal */}
                {showCategories && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm max-h-96 overflow-y-auto">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Select Category
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowCategories(false)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.name}
                            type="button"
                            onClick={() => handleCategorySelect(category.name)}
                            className="flex items-center space-x-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                          >
                            <div
                              className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center text-white text-sm`}
                            >
                              {category.icon}
                            </div>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {category.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Date Field */}
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-blue-500" />

                  <input
                    type="date"
                    {...register("date")}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800  rounded-2xl transition-all duration-200 text-gray-900 dark:text-white focus:outline-none"
                  />
                  {errors.date && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.date.message}
                    </p>
                  )}
                </div>

                {/* Note Field */}
                <div className="relative">
                  <NotebookPen
                    size={20}
                    className="absolute left-4 top-5 transition-colors duration-200 text-orange-500"
                  />
                  <textarea
                    placeholder="What did you spend on? (optional)"
                    rows={4}
                    {...register("note")}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 rounded-2xl transition-all duration-200 placeholder-gray-400 resize-none  text-gray-900 dark:text-white focus:outline-none"
                  />
                  {errors.note && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.note.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <IonButton
                  type="submit"
                  color={"success"}
                  className="w-full"
                  disabled={isSubmitting}
                >
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
                    <span>{isSubmitting ? "Adding..." : "Add Expense"}</span>
                  </div>
                </IonButton>
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
