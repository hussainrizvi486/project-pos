import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogClose,
} from "@components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table";
import { Checkbox } from "@components/ui/checkbox";
import { Button } from "@components/ui/button";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    RowSelectionState,
} from "@tanstack/react-table";

import { X as CloseIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setPriceList } from "../reducers/pos";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_API_URL } from "@api/index";

interface PriceListType {
    price_list: string;
    price_list_type: string;
    currency: string;
    disabled: boolean;
}

const mockPriceLists: PriceListType[] = [
    {
        price_list: "Standard Retail",
        price_list_type: "Selling",
        currency: "USD",
        disabled: false,
    },
    {
        price_list: "Wholesale",
        price_list_type: "Selling",
        currency: "USD",
        disabled: false,
    },
    {
        price_list: "Discount Sale",
        price_list_type: "Selling",
        currency: "USD",
        disabled: true,
    },
    {
        price_list: "International",
        price_list_type: "Selling",
        currency: "EUR",
        disabled: false,
    },
    {
        price_list: "Supplier Default",
        price_list_type: "Buying",
        currency: "USD",
        disabled: false,
    },
];

interface PriceListDialogProps {
    children: React.ReactNode;
    onSave?: (selectedPriceLists: PriceListType) => void;
    initialData?: PriceListType[];
}



const PriceListDialog: React.FC<PriceListDialogProps> = ({
    children,
    onSave,
}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState<PriceListType[]>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [open, setOpen] = useState(false);

    const priceListQuery = useQuery({
        queryKey: ['priceLists'],
        queryFn: async () => {
            const response = await axios.get(BASE_API_URL + '/pos/api/price-list');
            if (response.status != 200) {
                throw new Error('Failed to fetch price lists');
            }
            return response.data;
        },

    });

    const columns: ColumnDef<PriceListType>[] = [
        {
            id: "select",
            header: () => <div className="w-4">
                <Checkbox disabled />
            </div>,
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => {
                        setRowSelection({});
                        if (value) {
                            row.toggleSelected(!!value);
                        }
                    }}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "price_list",
            header: "Price List",
            cell: ({ row }) => <div className="font-medium">{row.getValue("price_list")}</div>,
        },
        {
            accessorKey: "price_list_type",
            header: "Type",
            cell: ({ row }) => <div>{row.getValue("price_list_type")}</div>,
        },
        {
            accessorKey: "currency",
            header: "Currency",
            cell: ({ row }) => <div>{row.getValue("currency")}</div>,
        },
        {
            accessorKey: "disabled",
            header: "Status",
            cell: ({ row }) => (
                <div className={row.getValue("disabled") ? "text-red-500" : "text-green-500"}>
                    {row.getValue("disabled") ? "Disabled" : "Enabled"}
                </div>
            ),
        },
    ];
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    const handleSave = () => {
        const selectedPriceLists = table.getFilteredRowModel().rows.filter((row) => row.getIsSelected()).map((row) => row.original)[0];
        if (!selectedPriceLists) {
            return;
        }

        if (onSave) {
            onSave(selectedPriceLists);
        }

        dispatch(setPriceList(selectedPriceLists));
        setOpen(false);
    };

    useEffect(() => {
        if (priceListQuery.data) {
            setData(priceListQuery.data);
        }
    }, [priceListQuery.data]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="p-4 max-w-3xl">
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <DialogTitle>
                            <div className="font-semibold ml-1">Price List</div>
                        </DialogTitle>

                        <DialogClose asChild onClick={() => setOpen(false)}>
                            <div className="hover:cursor-pointer">
                                <CloseIcon className="size-6" />
                            </div>
                        </DialogClose>
                    </div>

                    <div className="border rounded-md overflow-hidden">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() ? "selected" : undefined}
                                            className={row.getIsSelected() ? "bg-gray-50" : undefined}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex justify-between mt-4">
                        {/* <div className="text-sm text-gray-500">
                            {Object.keys(rowSelection).length} of {data.length} item(s) selected
                        </div> */}
                        <Button onClick={handleSave} className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white">
                            Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { PriceListDialog };