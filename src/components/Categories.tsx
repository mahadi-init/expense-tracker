import {
  Atom,
  CarFront,
  Clapperboard,
  Heart,
  Pizza,
  ShoppingBag,
} from "lucide-react";

const commonCategories = [
  {
    title: "Dining",
    subTitle: "Food and dining expenses",
    icon: <Pizza />,
  },
  {
    title: "Groceries",
    subTitle: "Grocery shopping",
    icon: <ShoppingBag />,
  },
  {
    title: "Transport",
    subTitle: "Transportation costs",
    icon: <CarFront />,
  },
  {
    title: "Entertainment",
    subTitle: "Entertainment expenses",
    icon: <Clapperboard />,
  },
  {
    title: "Health",
    subTitle: "Health and wellness expenses",
    icon: <Heart />,
  },

  {
    title: "Other",
    subTitle: "Unnamed expenses",
    icon: <Atom />,
  },
];

export default function Categories() {
  return (
    <div>
      {/*<p className="font-semibold text-lg">Existing Categories</p> */}
      <div className="flex gap-8 flex-col mt-2">
        {commonCategories.map((item) => {
          return (
            <a onClick={() => {}} className="flex items-center gap-6">
              <div className="bg-[#F2F5F2] p-4 rounded-md">{item.icon}</div>
              <div>
                <p className="text-xl font-medium">{item.title}</p>
                <p className="text-lg text-gray-600">{item.subTitle}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/*<button className="bg-[#54D12B] absolute flex items-center gap-2.5 bottom-32 font-medium right-6  px-10 py-4 text-xl rounded-md">
        <Plus />
        Add Category
      </button>
      */}
    </div>
  );
}
