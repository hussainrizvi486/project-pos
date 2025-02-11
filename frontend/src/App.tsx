import { AlignJustify, Search } from "lucide-react";
import "./index.css";
import React, { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "./components/ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "./components/ui/popover";
import { Checkbox } from "./components/ui/checkbox";
import { SidebarProvider, Sidebar, SidebarTrigger } from "./components/ui/sidebar";
import { Settings2, ReceiptText, PackageOpen, House, Dot } from "lucide-react"

const POSPage = React.lazy(() => import("./page/pos/index"));
const InvoicePage = React.lazy(() => import("./page/invoice/index"));
const LoginPage = React.lazy(() => import("./page/auth/login"));



const POSSidebar = () => {
  const items = [
    {
      "label": "Point of Sale",
      "icon": <House />
    },
    {
      "label": "Invoices",
      "icon": <ReceiptText />,
      "url": "/invoice"
    },
    {
      "label": "POS Settings",
      "icon": <Settings2 />
    },

    {
      "label": "Inventory",
      "icon": <PackageOpen />
    },


  ]

  return (
    <Sidebar variant="sidebar">

      <div className="py-4 px-2">

        <div className="flex items-center gap-2 mb-8 px-2">
          <img src="https://cdn-icons-png.flaticon.com/512/4464/4464973.png" alt="" className="h-8 w-8" />
          <div className=" font-medium">
            Point of Sale
          </div>
        </div>
        <div className="">
          <ul className="flex w-full min-w-0 flex-col gap-1">

            {items.map((val, i) => (
              <li key={i} >
                <Link to={val.url || ""} >
                  <button className="flex items-center gap-2 text-sm w-full p-2 text-left rounded-md hover:bg-gray-100 transition-all">
                    <div className="[&_*]:size-5 [&_*]:stroke-gray-700">
                      {val.icon ? val.icon : <><Dot /></>}
                    </div>
                    {val.label}
                  </button>
                </Link>
              </li>
            ))}
          </ul>

        </div>

      </div>


    </Sidebar>
  )
}


function POSApp() {
  return (
    <SidebarProvider defaultOpen={true}>
      <POSSidebar />
      <Suspense
        fallback={<h1 className="text-9xl">Loading...</h1>}>
        <div className="flex-auto">
          <div className="border-b mb-4">
            <Header />
          </div>

          <Routes>
            <Route path="/" element={<POSPage />} index />
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Suspense>
    </SidebarProvider>
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
                ))
                }

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


const Header = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  // Popover, PopoverTrigger, PopoverContent 
  return (
    <header className="flex items-center  justify-between px-6 py-2 ">
      <div className="flex items-center gap-3">

        {/* <SelectPriceList /> */}

        <SidebarTrigger>
          <div className="h-10 w-10 p-2 bg-gray-300 rounded-full cursor-pointer">
            <AlignJustify />
          </div>
        </SidebarTrigger>

        <Popover open={isOpen}>
          <div className="flex border items-center rounded-full py-2 px-4 w-96 focus-within:ring-1">
            <input
              type="text"
              placeholder="Search Item"
              className="w-100 outline-none bg-transparent flex-auto text-sm"
              onFocus={() => setIsOpen(true)}
              onClick={() => setIsOpen(true)}
            />
            <div >
              <Search />
            </div>
          </div>
          <PopoverContent className="w-96">
            <div className="border  p-2">
              <div>Sex</div>
              <div>Sex</div>
              <div>Sex</div>
              <div>Sex</div>
              <div>Sex</div>
            </div>
          </PopoverContent>
        </Popover>
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


export default POSApp;
