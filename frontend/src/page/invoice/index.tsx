import DataGrid from "../../components/data-grid";
import { Badge } from "../../components/ui/badge";

const Page = () => {

    return (
        <div className="px-4">
            <div>
                <div className="text-lg font-semibold ">POS Invoice</div>

            </div>
            <div></div>
            <div className="mt-4">
                <DataGrid
                    columns={[
                        { label: "ID", accessor: "id", sortable: true, },
                        { label: "Customer", accessor: "customer", sortable: true },
                        {
                            label: "Date", accessor: "date", sortable: true, type: "date"
                        },
                        {
                            label: "Quantity", accessor: "quantity", sortable: true, type: "float"
                        },
                        { label: "Grand Total", accessor: "grand_total", sortable: true, width: 20, type: "currency" },
                        { label: "Amount", accessor: "amount", sortable: true, type: "currency" },
                        { label: "Due Amount", accessor: "due_amount", sortable: true, type: "currency" },
                        {
                            label: "Status", accessor: "status", sortable: true,

                            renderCell: (value) => {
                                return (
                                    <Badge radius="medium" color={value == "Pending" ? "yellow" : value == "Paid" ? "green" : value == "Overdue" ? "red" : "blue"}>
                                        {value}
                                    </Badge>)
                            }
                        },
                    ]
                    }
                    data={[
                        {
                            id: "INV0001",
                            customer: "John Doe",
                            date: "2022-10-10",
                            quantity: 5,
                            grand_total: 100,
                            amount: 80,
                            due_amount: 20,
                            status: "Paid",
                        },
                        {
                            id: "INV00034",
                            customer: "John Doe",
                            date: "2022-10-10",
                            quantity: 5,
                            grand_total: 100,
                            amount: 80,
                            due_amount: 20,
                            status: "Draft",
                        },
                        {
                            id: "INV0002",
                            customer: "Jane Smith",
                            date: "2022-11-15",
                            quantity: 3,
                            grand_total: 250,
                            amount: 150,
                            due_amount: 100,
                            status: "Pending",
                        },
                        {
                            id: "INV0003",
                            customer: "Alice Johnson",
                            date: "2023-01-05",
                            quantity: 10,
                            grand_total: 175,
                            amount: 175,
                            due_amount: 0,
                            status: "Paid",
                        },
                        {
                            id: "INV0004",
                            customer: "Michael Brown",
                            date: "2023-02-20",
                            quantity: 2,
                            grand_total: 50,
                            amount: 25,
                            due_amount: 25,
                            status: "Overdue",
                        },
                    ]}
                /></div>
        </div>
    )
}

export default Page;


