import { zodResolver } from "@hookform/resolvers/zod";
import { IonButton, IonToast, useIonRouter } from "@ionic/react";
import { useSetAtom } from "jotai";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { userAtom } from "../lib/atoms";
import { useState, useTransition } from "react";
import post from "../https/post";
import { Toast } from "@capacitor/toast";

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { push } = useIonRouter();
  const setUser = useSetAtom(userAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    startTransition(async () => {
      const res = await post("/auth/signup", data);
      console.warn("DEBUGPRINT[18]: Login.tsx:38: res=", res);

      if (res.success) {
        await Toast.show({
          text: "Signup successful",
        });

        push("/home", "root");
      } else {
        await Toast.show({
          text: "Hello!",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-stone-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-200 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className=" rounded-3xl p-8 shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <div className="relative">
                <span className="absolute text-sky-500 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 " />
                </span>
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                  className="w-full pl-12 bg-white pr-4 py-4 border rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
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
                  <Lock className="h-5 w-5" />
                </span>
                <input
                  placeholder="Password"
                  type={!showPassword ? "password" : "text"}
                  {...register("password", { required: true })}
                  className="w-full pl-12 pr-12 py-4 border bg-white rounded-2xl focus:ring-2 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 pl-2 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 flex items-center justify-center">
            <p className="text-gray-400">Don't have an account? </p>
            <IonButton
              type="button"
              fill="clear"
              routerLink="/signup"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Sign up
            </IonButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
