import { Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { options } from "../data/route-options";

export default function Header() {
  const location = useLocation();
  const currentRoute = options.find((i) => i.url === location.pathname);

  return (
    <div className="flex items-center justify-between p-6">
      {currentRoute?.back}
      <div className="flex-1 flex justify-center">
        <p className="font-semibold">{currentRoute?.title}</p>
      </div>

      {/* when route is hide don't show settings */}
      {!currentRoute?.hide && (
        <Link to={"/settings"}>
          <Settings />
        </Link>
      )}
    </div>
  );
}
