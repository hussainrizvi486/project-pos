import { AlignJustify, Minus, Plus, Search, Trash2 } from "lucide-react";
import "./index.css";
import { POSItemCard } from "./features/item/components";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToSummary,
  updateItemQuantity,
  removeItem,
  getSummaryItems,
  getTotalCost,
} from "./features/pos/reducers/summary";
import { ListView } from "./views/list";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "./components/ui/dialog";
const POSPage = React.lazy(() => import("./page/pos/index"));

interface POSItem {
  id: string;
  item_name: string;
  image?: string;
  price: number;
}

function POSApp() {
  const [posItems, setPosItems] = useState([
    {
      category: "Electronics",
      id: 1,
      item_name: "Wireless Earbuds",
      price: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Accessories",
      id: 2,
      item_name: "Smartphone Stand",
      price: 15,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 3,
      item_name: "Bluetooth Speaker",
      price: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Accessories",
      id: 4,
      item_name: "Portable Charger",
      price: 25,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Wearables",
      id: 5,
      item_name: "Fitness Tracker",
      price: 30,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Home",
      id: 6,
      item_name: "LED Desk Lamp",
      price: 35,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Accessories",
      id: 7,
      item_name: "Laptop Sleeve",
      price: 40,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Gaming",
      id: 8,
      item_name: "Gaming Mouse",
      price: 45,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 9,
      item_name: "Noise-Canceling Headphones",
      price: 50,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 10,
      item_name: "4K Webcam",
      price: 55,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Accessories",
      id: 11,
      item_name: "USB-C Hub",
      price: 60,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Home",
      id: 12,
      item_name: "Smart Thermostat",
      price: 65,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 13,
      item_name: "Action Camera",
      price: 70,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Gaming",
      id: 14,
      item_name: "VR Headset",
      price: 75,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 15,
      item_name: "Drone",
      price: 80,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Wearables",
      id: 16,
      item_name: "Smartwatch",
      price: 85,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Gaming",
      id: 17,
      item_name: "Gaming Chair",
      price: 90,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 18,
      item_name: "Streaming Microphone",
      price: 95,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 19,
      item_name: "Wi-Fi Router",
      price: 100,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
    {
      category: "Electronics",
      id: 20,
      item_name: "E-Reader",
      price: 105,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s",
    },
  ]);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="border-b mb-4">
        <Header />
      </div>
      {/* <Dialog>
        <DialogTrigger asChild>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
            Open
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-lg font-semibold leading-none tracking-tight">
            POS Opening
          </DialogTitle>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos,
          suscipit. At necessitatibus perspiciatis maxime, sapiente provident in
          cum praesentium amet nulla ipsam corrupti facilis possimus qui,
          mollitia delectus fugit velit.
        </DialogContent>
      </Dialog> */}
      <Routes>
        <Route path="/" element={<POSPage />} />
      </Routes>
    </div>
  );
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="h-full">
        <div className="app-container">
          <Header />
        </div>
        <div className="app-container">
          <div className="flex gap-4">
            <div className="flex-auto">
              <div className="grid gap-4 grid-cols-5">
                {posItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      dispatch(addItemToSummary({ ...item, quantity: 1 }))
                    }
                  >
                    <POSItemCard itpem={item} />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 bg-white p-3 rounded-md">
              <POSSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <header className="flex items-center  justify-between px-6 py-4 ">
      <div className="flex items-center gap-3">
        <div className="">
          <AlignJustify />
        </div>
        <div className="flex border items-center rounded-full p-2 px-4 w-96">
          <input
            type="text"
            placeholder="Search Item"
            className="w-100 outline-none bg-transparent flex-auto text-sm"
          />
          <div className="search-box_icon">
            <Search />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">

          <button
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="absolute -inset-1.5"></span>
            <img
              className="size-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
              alt=""
            />
          </button>

          <div className="text-sm"> John Hammand</div>
        </div>
      </div>
    </header>
  );
};

const POSSummary = () => {
  const summaryItems: Array<POSItem> = useSelector(getSummaryItems);
  // const totalCost = useSelector(getTotalCost);

  return (
    <div className="w-[350px]">
      <div className="font-bold text-center text-sm">Order Summary</div>
      <div className="pos-summary-items">
        {summaryItems.map((item, index) => (
          <POSSummaryItem key={index} item={item} />
        ))}
      </div>
      <div className="pos-summary-detail"></div>
      <div className="pos-summary-actions">
        {/* <div className="flex gap-1">
          <button className="btn">Save Order</button>
          <button className="btn">Cancel Order</button>
        </div> */}
        {/* <div className="total-cost">Total Cost: ${totalCost.toFixed(2)}</div> */}
      </div>
    </div>
  );
};

const POSSummaryItem = ({ item }) => {
  if (!item) return;

  return (
    <div className="border mb-2 p-2 rounded">
      <div className="flex justify-between">
        <div className="flex gap-2 flex-auto">
          <div className="border rounded overflow-hidden flex-shrink-0">
            <img className=" max-w-[6rem] h-full " src={item.image} alt="" />
          </div>
          <div className="pt-2 flex-auto ">
            <div className="text-sm line-clamp-2">{item.item_name}</div>
            <div className="text-sm">{item.category}</div>
            <div className="font-semibold mt-2">$ {item.price}</div>
          </div>
        </div>

        <div>
          <div role="button">
            <Trash2 className="size-5 stroke-red-500" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center bg-gray-100 rounded-3xl p-1 w-32">
          <button className="rounded-full bg-white cursor-pointer p-2">
            <Minus className="size-5" />
          </button>
          <input
            type="text"
            value={item.quantity}
            className="h-full w-full bg-transparent outline-none text-center"
            readOnly
          />
          <button className="rounded-full bg-white cursor-pointer p-2">
            <Plus className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSApp;
