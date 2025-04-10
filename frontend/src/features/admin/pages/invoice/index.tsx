import { BASE_API_URL } from "@api/index";
import { Spinner } from "@components/loaders/spinner";
import { DataListRow, getGridTemplateColumns } from "@components/data-list";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, RowSelectionState, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


interface InvocieListItem {
    invoice_no: string;
    customer_name: string;
    posting_date: string;
    total_qty: number;
    grand_total: number;
    paid_amount: number;
    outstanding_amount: number;
    status: string;
}


const Index = () => {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

    const columns: ColumnDef<InvocieListItem>[] = [
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
            enableHiding: false,
        },
        {
            accessorKey: "invoice_no",
            header: "Invoice No",
        },
        {
            accessorKey: "customer_name",
            header: "Customer",
        },
        {
            accessorKey: "posting_date",
            header: "Date",
        },
        {
            accessorKey: "total_qty",
            header: "Quantity",
        },
        {
            accessorKey: "grand_total",
            header: "Grand Total",
        },
        {
            accessorKey: "paid_amount",
            header: "Amount",
        },
        {
            accessorKey: "outstanding_amount",
            header: "Due Amount",
        },
        {
            accessorKey: "status",
            header: "Status",
        }
    ]

    const ivnoiceQuery = useQuery({
        queryKey: ["invoice"],
        queryFn: async () => {
            const request = await axios.get(BASE_API_URL + "/pos/api/invoice");
            return request.data;
        }
    })

    const data: Array<InvocieListItem> = ivnoiceQuery?.data || [];


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    });




    return (
        <div className="p-4">

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-x-1">
                    <div className="font-semibold text-lg">Invoices</div>
                </div>

                <div>
                    <Link to={"/invoice/create"}>
                        <Button>Create</Button>
                    </Link >
                </div>
            </div>

            <div>
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
                                        className="flex items-center text-left text-sm font-medium px-4 py-2 bg-gray-100 text-gray-700"
                                    >
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </div>
                                );
                            })}
                        </div>
                    ))}


                    {ivnoiceQuery.isLoading &&
                        <div className="p-2 text-sm text-center text-gray-500 grid items-center">
                            <div className="flex flex-col items-center justify-center">
                                <Spinner />
                                <div className="mt-1 text-sm text-gray-500">Loading...</div>
                            </div>
                        </div>
                    }
                    {!ivnoiceQuery.isLoading && data?.length &&
                        (
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
                            </div>)
                    }


                </div>
                {
                    !ivnoiceQuery.isLoading && !ivnoiceQuery.isError && data?.length > 0 && (
                        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                            <div>
                                {Object.keys(rowSelection).length} of {data?.length} item(s) selected
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Index;