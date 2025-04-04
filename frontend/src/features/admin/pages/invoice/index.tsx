import { BASE_API_URL } from "@api/index";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, flexRender, getCoreRowModel, RowSelectionState, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { Rows } from "lucide-react";
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


            <div className="mt-4">
                <table className='w-full border'>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, i) => (
                                    <th key={i} className="text-left text-sm font-normal px-2 py-2 bg-gray-100 text-gray-500">
                                        {
                                            header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map((row) => (
                                <tr key={row.id} className="border-b last-of-type:border-b-0">
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-2 py-2 text-sm">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                                    ))}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index;