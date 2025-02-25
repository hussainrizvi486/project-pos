import "./index.css";

import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AlignJustify, Search } from "lucide-react";

import { ToastProvider } from "@components/ui/toast";


import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@components/ui/dialog";
import { Checkbox } from "@components/ui/checkbox";
import { SidebarProvider } from "@components/ui/sidebar";
import { SidebarLayout } from "@components/layouts";


const POSPage = React.lazy(() => import("./page/pos/index"));
const InvoicePage = React.lazy(() => import("./page/invoice/index"));
const LoginPage = React.lazy(() => import("./page/auth/login"));
const CheckoutPage = React.lazy(() => import("./page/checkout/index"));


const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}

function POSApp() {
  return (
    <Suspense
      fallback={< LoadingSpinner />}>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<POSPage />} index />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {/* </div> */}
    </Suspense >
  );

}



export function SelectPriceList() {
  const data = [
    {
      "price_list_name": "Standard Selling",
      "currency": "PKR",
      "status": "Active",
    },
    {
      "price_list_name": "Ecommerce",
      "currency": "PKR",
      "status": "Active",

    }
  ]
  return (

    <div className="h-10 w-10 p-2 bg-gray-300 rounded-full cursor-pointer">

      <Dialog >
        <DialogTrigger asChild>
          <AlignJustify />
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogTitle>Price List</DialogTitle>

          <div>


            <div className="rounded-md border">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b transition-colors">
                    <th className="h-10 px-2 text-left">
                      <Checkbox />
                    </th>
                    <th className="h-10 px-2 text-left align-middle">Price List Name</th>
                    <th className="h-10 px-2 text-left align-middle">Status</th>
                    <th className="h-10 px-2 text-left align-middle">Currency</th>
                  </tr>
                </thead>
                {data.map((val, i) => (
                  <tr key={i} className="border-b transition-colors hover:bg-gray-100 cursor-pointer">
                    <td className="h-10 px-2 ">
                      <Checkbox />
                    </td>
                    <td className="h-10 px-2 text-left align-middle">{val.price_list_name}</td>
                    <td className="h-10 px-2 text-left align-middle">{val.status}</td>
                    <td className="h-10 px-2 text-left align-middle">{val.currency}</td>
                  </tr>
                ))}
              </table>
            </div>

          </div>

          <DialogClose asChild>
            <button className="rounded-md bg-gray-900 px-3 py-2 text-sm text-white">Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default POSApp;
