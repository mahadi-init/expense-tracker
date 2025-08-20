import { zodResolver } from "@hookform/resolvers/zod";
import { IonButton, useIonRouter } from "@ionic/react";
import { Lock, Mail, User } from "lucide-react";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import post from "../https/post";
import { Toast } from "@capacitor/toast";
import { Dialog } from "@capacitor/dialog";
import { userAtom } from "../lib/atoms";
import { useAtom, useSetAtom } from "jotai";

// Zod Schema for Signup
const signupSchema = z.object({
  username: z.string().min(1, "Full name is required"),
  email: z.email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const setUser = useSetAtom(userAtom);
  const { push } = useIonRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  console.warn("DEBUGPRINT[19]: Signup.tsx:37: errors=", errors);

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    startTransition(async () => {
      const res = await post("/auth/signup", data);
      console.warn("DEBUGPRINT[18]: Login.tsx:38: res=", res);

      if (res.success) {
        setUser({
          username: data.username,
          email: data.email,
        });

        await Dialog.alert({
          title: "Signup successful",
          message: "Navigating to homepage",
        });

        setTimeout(() => {
          push("/home", "root");
        }, 50);
      } else {
        await Dialog.alert({
          title: "Stop",
          message: "this is an error",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-stone-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Create Account
          </h1>
          <p className="text-gray-400">Join us today</p>
        </div>

        {/* Signup Form */}
        <div className=" rounded-3xl p-8 shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="relative">
                <span className="absolute text-sky-600 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5" />
                </span>
                <input
                  type="text"
                  placeholder="Full name"
                  {...register("username", { required: true })}
                  className="w-full bg-white pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 "
                />
              </div>
              {errors.username && (
                <p className="text-red-500 pl-2 text-sm mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <span className="absolute text-sky-600 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 " />
                </span>
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                  className="w-full pl-12 bg-white pr-4 py-4 border rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 "
                />
              </div>
              {errors.email && (
                <p className="text-red-500 pl-2 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <span className="absolute text-sky-600 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 " />
                </span>
                <input
                  placeholder="Create password"
                  {...register("password", { required: true })}
                  className="w-full pl-12 pr-12 py-4 bg-white border rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 "
                />
              </div>
              {errors.password && (
                <p className="text-red-500 pl-2 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              <span>Create Account</span>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-4 flex items-center justify-center">
            <p className="text-gray-400">Already have an account? </p>
            <IonButton
              type="button"
              fill="clear"
              routerLink="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Sign in
            </IonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
