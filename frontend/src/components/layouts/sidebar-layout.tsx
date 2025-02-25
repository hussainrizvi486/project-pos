import { Outlet, Link } from "react-router-dom";
import { Settings2, ReceiptText, PackageOpen, House, Dot } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarTrigger } from "@components/ui/sidebar";
import { Header } from "./header";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@components/ui/dialog";

function PriceListDiaog() {
    return (
        <Dialog defaultOpen={true}>
            <DialogContent >
                <DialogTitle>Price List</DialogTitle>


                <div>
                    <table>
                        <tr>
                            <th>Sr</th>
                            <th>Name</th>
                            <th>Currency</th>
                        </tr>
                    </table>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const PriceList = [
    {
        "sr": 1,
        "name": "Standard Selling",
        "currency": "PKR",
        "status": "Enabled"
    },

    {
        "sr": 2,
        "name": "Discount",
        "currency": "PKR",
        "status": "Enabled"
    },

]
export const SidebarLayout = () => {


    const SIDEBAR_ITEMS = [
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
            "icon": <PackageOpen />,
            render: () =>
            (
                <Dialog>
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 text-sm w-full p-2 text-left rounded-md hover:bg-gray-100 transition-all">
                            <div className="[&_*]:size-5 [&_*]:stroke-gray-700">
                                <PackageOpen />
                            </div>
                            Inventory
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <div className="p-4">
                            <div className="text-lg font-semibold mb-4">Price List</div>

                            <div>
                                <table className="border border-gray-200 w-full table-fixed">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-1 px-2 border-b border-gray-200 text-sm font-medium text-left w-6">#</th>
                                            <th className="p-1 px-2 border-b border-gray-200 text-sm font-medium text-left">Name</th>j
                                            <th className="p-1 px-2 border-b border-gray-200 text-sm font-medium text-left">Currency</th>
                                            <th className="p-1 px-2 border-b border-gray-200 text-sm font-medium text-left">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PriceList.map((val, i) => (
                                            <tr key={i} className="hover:bg-gray-100 cursor-pointer">
                                                <td className="p-1 px-2 border-b text-sm font-medium text-left">{val.sr}</td>
                                                <td className="p-1 px-2 border-b text-sm font-medium text-left">{val.name}</td>
                                                <td className="p-1 px-2 border-b text-sm font-medium text-left">{val.currency}</td>
                                                <td className="p-1 px-2 border-b text-sm font-medium text-left">{val.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )


        },
    ]
    return (
        <SidebarProvider>
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

                            {SIDEBAR_ITEMS.map((val, i) => (
                                <li key={i} >
                                    {
                                        val.render ? val.render() : <Link to={val.url || ""} onClick={val.onClick}>
                                            <button className="flex items-center gap-2 text-sm w-full p-2 text-left rounded-md hover:bg-gray-100 transition-all">
                                                <div className="[&_*]:size-5 [&_*]:stroke-gray-700">
                                                    {val.icon ? val.icon : <><Dot /></>}
                                                </div>
                                                {val.label}
                                            </button>
                                        </Link>
                                    }

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Sidebar>

            <div className="flex-auto">
                <Header />
                <Outlet />
            </div>
        </SidebarProvider>
    )
}