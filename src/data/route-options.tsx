import {
  ArrowLeft,
  BanknoteArrowDown,
  ClipboardMinus,
  DollarSign,
  House,
  Settings,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

export const options = [
  {
    title: "Dashboard",
    url: "/",
    icon: <House />,
  },
  {
    title: "Income",
    url: "/income",
    icon: <DollarSign />,
    back: (
      <Link to={"/"}>
        <X className="mt-0.5" />
      </Link>
    ),
  },
  {
    title: "Expenses",
    url: "/expenses",
    child: "/categories",
    icon: <BanknoteArrowDown />,
    back: (
      <Link to={"/"}>
        <X className="mt-0.5" />
      </Link>
    ),
  },
  {
    title: "Reports",
    url: "/reports",
    icon: <ClipboardMinus />,
    back: (
      <Link to={"/"}>
        <X className="mt-0.5" />
      </Link>
    ),
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
    back: (
      <Link to={"/"}>
        <X className="mt-0.5" />
      </Link>
    ),
  },
  {
    title: "Expense Categories",
    url: "/categories",
    hide: true,
    back: (
      <Link to={"/expenses"}>
        <ArrowLeft className="mt-0.5" />
      </Link>
    ),
  },
];
