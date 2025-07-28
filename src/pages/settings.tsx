import { ArrowRight, CloudUpload } from "lucide-react";

export default function Settings() {
  return (
    <div className="mt-2">
      {/* general */}
      <div>
        <p className="font-bold text-md">General</p>

        <div className="flex flex-col gap-6 mt-4 text-md font-medium text-gray-700">
          <div className="flex justify-between items-center">
            <p>Currency</p>
            <p>USD</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Language</p>
            <p>English</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Theme</p>
            <p>System</p>
          </div>
        </div>
      </div>

      {/* notifications */}
      <div>
        <p className="font-bold text-md mt-10">Notifications</p>

        <div className="flex flex-col gap-6 mt-4 text-md font-medium text-gray-700">
          <div className="flex justify-between items-center">
            <p>Daliy Remainders</p>
            <p>TODO</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Transaction Alerts</p>
            <p>TODO</p>
          </div>
        </div>
      </div>

      {/* data */}
      <div>
        <p className="font-bold text-md mt-10">Data</p>

        <div className="flex flex-col gap-6 mt-4 text-md font-medium text-gray-700">
          <div className="flex justify-between items-center">
            <p>Backup Data</p>
            <CloudUpload />
          </div>

          <div className="flex justify-between items-center">
            <p>Restore Data</p>
            <CloudUpload />
          </div>
        </div>
      </div>

      {/* about */}
      <div>
        <p className="font-bold text-md mt-10">About</p>

        <div className="flex flex-col gap-6 mt-4 text-md font-medium text-gray-700">
          <div className="flex justify-between items-center">
            <p>App Version</p>
            <p>1.2.3</p>
          </div>

          <div className="flex justify-between items-center">
            <p>Terms of Service</p>
            <ArrowRight />
          </div>

          <div className="flex justify-between items-center">
            <p>Privacy Policy</p>
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}
