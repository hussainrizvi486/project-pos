import { AlignJustify, AwardIcon, Minus, Plus, Search, Trash2, Package } from "lucide-react";


// import { POSItemCard } from "./features/item/components";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToSummary,
  updateItemQuantity,
  removeItem,
  getSummaryItems,
  getTotalCost,
} from "../../features/pos/reducers/summary";

import { Summary } from "./summary";
import { useEffect, useState } from "react";
import { POSItemCard } from "../../features/item/components/POSItemCard";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';


export const tempItems = [
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
];

export interface POSItem {
  id: string;
  item_name: string;
  price: number;
  category: string;
  image?: string;
  description?: string,
  stock?: number;
  has_varaints?: boolean;
  item_variant?: [];
  variant_of?: string,
  default_uom?: string,
}



const ItemGridLoading = () => {
  return (
    <div className="grid gap-2 grid-cols-6  px-4">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="animate-pulse h-48  rounded-md"></div>
      ))}
    </div>
  )
}

const Page = () => {

  const dispatch = useDispatch();
  // console.warn(import.meta.env.VITE_API_URL)
  // return <></>
  const itemQuery = useQuery({
    queryKey: ["posItems"],
    queryFn: async () => {
      const response = await axios.get(import.meta.env.VITE_API_URL + "/pos/api/items");
      return response.data;
    }
  });


  return (
    <div>
      <div className="grid grid-cols-10 gap-1">
        <div className="col-span-7">


          <div className="overflow-y-scroll h-[75vh]">

            {
              itemQuery.isLoading ? <ItemGridLoading /> :
                itemQuery.isSuccess && itemQuery.data?.items?.length ? <div className="grid gap-2 grid-cols-6  px-4">
                  {
                    itemQuery.data.items.map((item, i) => (
                      <div key={i} onClick={() => dispatch(addItemToSummary({ ...item, quantity: 1 }))}>
                        <POSItemCard item={item} />
                      </div>))
                  }
                </div> : <div className="flex justify-center items-center flex-col p-6">
                  <Package className="stroke-gray-500 size-10" />
                  <div className="text-center text-gray-500 mt-2 font-semibold">
                    No items
                  </div>
                </div>
            }
          </div>


          {/* <div className="overflow-y-scroll h-[75vh]">

            <div className="grid gap-2 grid-cols-6  px-4">
              {itemQuery.isLoading ? <div className="animate-pulse h-48  rounded-md"></div> :
                itemQuery.data ? itemQuery.data.items.map((item, i) => ((
                  <div
                    key={i}
                    onClick={() =>
                      dispatch(addItemToSummary({ ...item, quantity: 1 }))
                    }>
                    <POSItemCard item={item} />
                  </div>
                ))) : !itemQuery.data && !itemQuery.isLoading && !itemQuery.isSuccess ? <></> : <></>}
            </div>

          </div> */}


        </div>

        <div className="flex-shrink-0 bg-white p-3 rounded-md border  border-red-100 col-span-3">
          <Summary />
        </div>
      </div>
    </div >
  );
};

export default Page;
