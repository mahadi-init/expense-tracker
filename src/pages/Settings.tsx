import { IonContent, IonPage } from "@ionic/react";
import Wrapper from "../components/Wrapper";
import Toolbar from "../components/Toolbar";
import { useState } from "react";

const Settings: React.FC = () => {
  const [dailyReminders, setDailyReminders] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedTheme, setSelectedTheme] = useState("System");

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];
  const languages = ["English", "Spanish", "French", "German", "Chinese"];
  const themes = ["Light", "Dark", "System"];

  const handleBackup = () => {
    // Handle backup functionality
    console.log("Backing up data...");
  };

  const handleRestore = () => {
    // Handle restore functionality
    console.log("Restoring data...");
  };

  return (
    <IonPage>
      <Toolbar title="Settings" />
      <IonContent fullscreen>
        <Wrapper>
          <div className="py-8 space-y-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6 shadow-lg">
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                Settings
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Customize your experience
              </p>
            </div>

            {/* General Settings */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                General
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Currency */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-green-600 dark:text-green-400"
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
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Currency
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Display currency for amounts
                        </p>
                      </div>
                    </div>
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Language */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
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
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Language
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          App display language
                        </p>
                      </div>
                    </div>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {languages.map((language) => (
                        <option key={language} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Theme */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-purple-600 dark:text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Theme
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          App appearance preference
                        </p>
                      </div>
                    </div>
                    <select
                      value={selectedTheme}
                      onChange={(e) => setSelectedTheme(e.target.value)}
                      className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {themes.map((theme) => (
                        <option key={theme} value={theme}>
                          {theme}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full mr-3"></div>
                Notifications
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Daily Reminders */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-5 5v-5zM12 8a3 3 0 100-6 3 3 0 000 6zm0 0v10"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Daily Reminders
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get reminded to track expenses
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setDailyReminders(!dailyReminders)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
                        dailyReminders
                          ? "bg-yellow-500"
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          dailyReminders ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Transaction Alerts */}
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-red-600 dark:text-red-400"
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
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Transaction Alerts
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Alerts for large transactions
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTransactionAlerts(!transactionAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                        transactionAlerts
                          ? "bg-red-500"
                          : "bg-gray-200 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          transactionAlerts ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Management */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full mr-3"></div>
                Data Management
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Backup Data */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <button
                    onClick={handleBackup}
                    className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-cyan-600 dark:text-cyan-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Backup Data
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Save your data to cloud
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Restore Data */}
                <div className="p-6">
                  <button
                    onClick={handleRestore}
                    className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Restore Data
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Restore from backup
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full mr-3"></div>
                About
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* App Version */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <svg
                          className="w-5 h-5 text-gray-600 dark:text-gray-400"
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
                        <p className="font-semibold text-gray-900 dark:text-white">
                          App Version
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Current version information
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-mono text-sm rounded-lg">
                      v1.2.3
                    </span>
                  </div>
                </div>

                {/* Terms of Service */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                  <button className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Terms of Service
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Read our terms and conditions
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Privacy Policy */}
                <div className="p-6">
                  <button className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -m-2 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <svg
                          className="w-5 h-5 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Privacy Policy
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Learn how we protect your data
                        </p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-8 pb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Made with ❤️ for better financial management
              </p>
            </div>
          </div>
        </Wrapper>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
