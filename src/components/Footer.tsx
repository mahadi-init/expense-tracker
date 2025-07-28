import { Link, useLocation } from "react-router-dom";
import { options } from "../data/route-options";

export default function Footer() {
  const location = useLocation();

  return (
    <footer className="absolute flex justify-around bottom-0 w-full bg-[F2F5F2] border-t-[#F2F5F2] border-t-1  py-6  ">
      {options.map((item) => (
        <Link
          to={item.url}
          className={`flex flex-col gap-2 items-center ${location.pathname === item.url ? "text-gray-800 !font-semibold" : "text-gray-400 font-medium "}`}
        >
          {item.icon}
          <p className="text-sm">{item.title}</p>
        </Link>
      ))}
    </footer>
  );
}
