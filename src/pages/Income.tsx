import { IonButton, IonContent, IonPage } from "@ionic/react";
import Wrapper from "../components/Wrapper";
import Toolbar from "../components/Toolbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import post from "../https/post";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import {
  Calendar,
  ChartBarStacked,
  DollarSign,
  NotebookPen,
} from "lucide-react";

// Zod schema for form validation
const incomeSchema = z.object({
  amount: z
    .number({ message: "Amount is required" })
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
  source: z
    .string({ message: "Source is required" })
    .min(1, "Source is required")
    .max(100, "Source must be less than 100 characters"),
  note: z.string().max(500, "Note must be less than 500 characters").optional(),
  date: z
    .string({ message: "Date is required" })
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format"),
});

type IncomeFormData = z.infer<typeof incomeSchema>;

const Income: React.FC = () => {
  const { mutate } = useSWRConfig();
  const { trigger } = useSWRMutation(
    "/income/add",
    async (url, { arg }: { arg: IncomeFormData }) => post(url, arg),
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IncomeFormData>({
    resolver: zodResolver(incomeSchema),
  });

  const onSubmit = async (data: IncomeFormData) => {
    try {
      await trigger(data);
      mutate("/dashboard/stats");
      reset();
    } catch (error) {
      console.error("Error submitting income:", error);
    }
  };

  return (
    <IonPage>
      <Toolbar title="Income" />
      <IonContent fullscreen>
        <Wrapper>
          <div className="min-h-screen py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Add New Income
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Track your earnings and build your financial future
              </p>
            </div>

            {/* Form Container */}
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Amount Field */}
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-blue-500" />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("amount", { valueAsNumber: true })}
                    className="w-full pl-12 pr-4 py-4 text-lg font-semibold bg-white dark:bg-gray-800 border rounded-2xl transition-all duration-200 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none"
                  />
                  {errors.amount && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.amount.message}
                    </p>
                  )}
                </div>

                {/* Source Field */}
                <div className="relative">
                  <ChartBarStacked className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-blue-500" />

                  <input
                    type="text"
                    placeholder="e.g., Salary, Freelance, Business"
                    {...register("source")}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border rounded-2xl transition-all duration-200 placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none"
                  />
                  {errors.source && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.source.message}
                    </p>
                  )}
                </div>

                {/* Date Field */}
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 text-blue-500" />
                  <input
                    type="date"
                    {...register("date")}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border rounded-2xl transition-all duration-200 text-gray-900 dark:text-white focus:outline-none"
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
                    placeholder="Add a note (optional)"
                    rows={4}
                    {...register("note")}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-800 border rounded-2xl transition-all duration-200 placeholder-gray-400 resize-none text-gray-900 dark:text-white focus:outline-none"
                  />
                  {errors.note && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.note.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <IonButton
                  color={"success"}
                  type="submit"
                  size="default"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{isSubmitting ? "Saving..." : "Save Income"}</span>
                  </div>
                </IonButton>
              </form>
            </div>

            {/* Tips Section */}
            <div className="max-w-md mx-auto mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
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
                    Pro Tip
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Categorize your income sources to better track where your
                    money comes from and identify your most profitable
                    activities.
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

export default Income;
