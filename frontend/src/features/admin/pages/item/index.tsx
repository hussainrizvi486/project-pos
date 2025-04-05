import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    RowSelectionState,
    useReactTable
} from "@tanstack/react-table";
import { Checkbox } from "@components/ui/checkbox";
import { Spinner } from "@components/loaders/spinner";
import { cn, decimal } from "@utils/index";
import { BASE_API_URL } from "@api/index";
import { DataListRow, getGridTemplateColumns } from "@components/data-list";
import { Link } from "react-router-dom";

// Move interface outside the component
interface ItemType {
    price: number;
    image: string;
    id: string;
    item_name: string;
    category: string;
    category_name: string;
    description: string;
    disabled: boolean;
    variant_of: string;
    item_type: string;
    default_uom: string;
}

// Extract grid template columns helper function


const ItemsTable = () => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const { data, isLoading, isError } = useQuery<{ items: ItemType[] }>({
        queryKey: ["items-list"],
        queryFn: async () => {
            const res = await axios.get(`${BASE_API_URL}/pos/api/items`);

            return res.data;
        },
    });

    const columns: ColumnDef<ItemType>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            meta: {
                width: 150,
            },
            enableHiding: false,
        },
        {
            accessorKey: "item_name",
            header: "Item",
            meta: {
                width: "3fr",
            },
            cell: ({ row }) => (
                <Link to={"/item/update/" + row.original.id}>
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-6 shrink-0 rounded-full overflow-hidden">
                            <img
                                src={row.original.image}
                                alt={row.getValue("item_name")}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="line-clamp-1">{row.getValue("item_name")}</div>
                    </div>
                </Link>
            ),
        },
        {
            accessorKey: "category",
            meta: {
                width: 200,
            },
            header: "Category",
            cell: ({ row }) => <div>{row.getValue("category")?.name || ""}</div>
        },
        {
            accessorKey: "default_uom",
            header: "UOM",
            meta: {
                width: 200,
            },
            cell: ({ row }) => <div>{row.getValue("default_uom")?.name || ""}</div>,
        },
        {
            accessorKey: "price",
            meta: {
                width: 200,
            },
            header: () => <div className="text-right flex-auto">Price</div>,
            cell: ({ row }) => <div className="text-right">${decimal(row.getValue("price"))}</div>,
        },
    ];

    const table = useReactTable({
        data: data?.items || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });

    return (
        <div>
            <div className="mb-2">
                <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">Items</div>
                    <div>
                        <Link to="/item/create">
                            <button className="bg-red-700 text-white font-semibold px-4 py-2 rounded text-sm">
                                Create Item
                            </button>
                        </Link>
                    </div>
                </div>
            </div>



            <div className="mt-4 border rounded-md overflow-hidden">
                {table.getHeaderGroups().map((headerGroup) => (
                    <div
                        className="grid items-center"
                        key={headerGroup.id}
                        style={{ gridTemplateColumns: getGridTemplateColumns(headerGroup.headers) }}
                    >
                        {headerGroup.headers.map((header) => {
                            return (
                                <div
                                    key={header.id}
                                    className={cn(
                                        "flex items-center text-left text-sm font-medium px-4 py-2 bg-gray-100 text-gray-700"
                                    )}
                                >
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </div>
                            );
                        })}
                    </div>
                ))}

                {isLoading &&
                    <div className="p-2 text-sm text-center text-gray-500 grid items-center">
                        <div className="flex flex-col items-center justify-center">
                            <Spinner />
                            <div className="mt-1 text-sm text-gray-500">Loading...</div>
                        </div>
                    </div>
                }

                {!isLoading && !data?.items?.length && (
                    <div className="" >
                        <div className="p-2 text-sm text-center text-gray-500 grid items-center">
                            No items found.
                        </div>
                    </div>
                )}

                {!isLoading && data?.items?.length && (
                    <div>
                        {table.getRowModel().rows.map((row) => (
                            <DataListRow style={{ gridTemplateColumns: getGridTemplateColumns(table.getHeaderGroups()[0].headers) }} row={row} key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <div key={cell.id} className="px-4 py-2 text-sm">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    );
                                })}
                            </DataListRow>
                        ))}
                    </div>
                )
                }
            </div>

            {/* Pagination controls could go here */}
            {
                !isLoading && !isError && data?.items?.length > 0 && (
                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                        <div>
                            {Object.keys(rowSelection).length} of {data?.items?.length} item(s) selected
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ItemsTable;

