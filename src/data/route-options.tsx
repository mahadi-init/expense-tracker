import {
  BanknoteArrowDown,
  ClipboardMinus,
  DollarSign,
  House,
  Settings,
} from "lucide-react";

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
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: <BanknoteArrowDown />,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: <ClipboardMinus />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
];
