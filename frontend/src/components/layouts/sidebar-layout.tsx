import { Outlet, Link } from "react-router-dom";
import { Settings2, ReceiptText, PackageOpen, House, Dot, Settings as SettingsIcon, X as CloseIcon } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarTrigger } from "@components/ui/sidebar";
import { Header } from "./header";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@components/ui/dialog";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from '@tanstack/react-query'
import { BASE_API_URL } from "@api";
import { DialogClose } from "@radix-ui/react-dialog";

const PriceListDialog = ({ isOpen }: { isOpen: boolean }) => {


    const query = useQuery({
        queryKey: ["price-list"],
        queryFn: async () => {
            const response = await axios.get(BASE_API_URL + "/pos/api/price-list");
            return response.data;
        },

    });
    interface PriceListType {
        currency: string;
        price_list: string;
        disabled: boolean;
        price_list_type: string
    }
    // {
    //     "currency": "PKR",
    //     "price_list": "Standard Selling",
    //     "disabled": false,
    //     "price_list_type": "selling"
    // }

    // console.log(query.isLoading)
    // console.log(query.data)

    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="p-4 max-w-3xl">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="font-semibold ml-1">
                            Price List
                        </div>

                        <DialogClose asChild>
                            <div className="hover:cursor-pointer">
                                <CloseIcon className="size-6" />
                            </div>
                        </DialogClose>
                    </div>

                    <div className="border rounded overflow-hidden">

                        <table className="w-full ">
                            <thead>
                                <tr>
                                    <th className="bg-gray-200 text-black text-sm text-left font-medium p-3 border-b w-3/12">Price list</th>
                                    <th className="bg-gray-200 text-black text-sm text-left font-medium p-3 border-b w-3/12">Currency</th>
                                    <th className="bg-gray-200 text-black text-sm text-left font-medium p-3 border-b w-3/12">22Type</th>
                                    <th className="bg-gray-200 text-black text-sm text-left font-medium p-3 border-b w-3/12">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    query.data ? query.data.map((row: PriceListType, i) => (
                                        <tr className="hover:cursor-pointer hover:bg-gray-100 transition-all" key={i}>
                                            <td className="text-sm text-left p-3 ">{row.price_list}</td>
                                            <td className="text-sm text-left p-3 ">{row.currency}</td>
                                            <td className="text-sm text-left p-3 ">{row.price_list_type}</td>
                                            <td className="text-sm text-left p-3 ">

                                                <div className="flex gap text-sm items-center font-semibold"> {!row.disabled ? "Enabled" : "Disabled"}</div>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan={4} className="text-sm p-3 font-semibold text-center">No Items</td></tr>
                                }
                            </tbody>

                        </table>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button className="rounded-md bg-gray-900 px-2 py-1 text-sm  text-white ">Save</button>

                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
};

const SIDEBAR_ITEMS = [
    {
        label: "Point of Sale",
        icon: <House />,
        handleClick: function () { }
    },
    {
        label: "Invoices",
        icon: <ReceiptText />,
        url: "/invoice",
        handleClick: function () { }
    },
    {
        label: "POS Settings",
        icon: <Settings2 />,
    },
    {
        label: "Settings",
        icon: <SettingsIcon />,
        handleClick: function () { }
    },
    {
        label: "Inventory",
        icon: <PackageOpen />,
        handleClick: function () { }
    },
];


export const SidebarLayout = () => {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <SidebarProvider>
            <PriceListDialog isOpen={isOpen} />

            <Sidebar variant="sidebar">
                <div className="py-4 px-2">
                    <div className="flex items-center gap-2 mb-8 px-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4464/4464973.png"
                            alt=""
                            className="h-8 w-8"
                        />
                        <div className="font-medium">Point of Sale</div>
                    </div>
                    <div>
                        <ul className="flex w-full min-w-0 flex-col gap-1">
                            {SIDEBAR_ITEMS.map((val, i) => (
                                <li key={i}>
                                    <button
                                        className="flex items-center gap-2 text-sm w-full p-2 text-left rounded-md hover:bg-gray-100 transition-all"
                                        onClick={() => {
                                            setIsOpen((prev) => !prev);
                                        }}
                                    >
                                        <div className="[&_*]:size-5 [&_*]:stroke-gray-700">
                                            {val.icon}
                                        </div>
                                        {val.label}
                                    </button>
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
    );
};