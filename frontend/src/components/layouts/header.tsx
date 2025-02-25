import React from "react";
import { AlignJustify, Search } from "lucide-react";
import { SidebarTrigger } from "../../components/ui/sidebar";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";

export const Header = () => {
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <header className="flex items-center  justify-between px-6 py-2 ">
            <div className="flex items-center gap-3">
                <SidebarTrigger>
                    <div className="h-10 w-10 p-2 bg-gray-300 rounded-full cursor-pointer">
                        <AlignJustify />
                    </div>
                </SidebarTrigger>

                <Popover defaultOpen={true} open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
                    <div>
                        <div className="flex border items-center rounded-full py-2 px-4 w-96 focus-within:ring-1">
                            <PopoverTrigger asChild>
                                <input
                                    type="text"
                                    placeholder="Search Item"
                                    className="w-100 outline-none bg-transparent flex-auto text-sm"
                                    onFocus={() => setIsOpen(true)}
                                    onClick={() => setIsOpen(true)}
                                    onBlur={() => setIsOpen(false)}
                                />
                            </PopoverTrigger>
                            <div className="cursor-pointer">
                                <Search />
                            </div>
                        </div>
                    </div>

                    {/* <PopoverContent className="w-96">
                        <div className="">
                            <div className="text-sm border-b py-2 font-medium">Invoicing</div>
                            <div className="text-sm border-b py-2 font-medium">Accounts</div>
                            <div className="text-sm border-b py-2 font-medium">Inventory</div>
                        </div>
                    </PopoverContent> */}
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
}