import { useQuery } from '@tanstack/react-query'
import DataGrid from "../../components/data-grid";
import { Badge } from "../../components/ui/badge";
import axios from "axios";

const Page = () => {

    const ivnoiceQuery = useQuery({
        queryKey: ["invoice"],
        queryFn: async () => {
            const request = await axios.get(import.meta.env.VITE_API_URL + "/pos/api/invoice");
            return request.data;
        }
    })


    const invoiceData = ivnoiceQuery?.data || [];

    const columns = [
        { label: "ID", accessor: "invoice_no", sortable: true, },
        { label: "Customer", accessor: "customer_name", sortable: true },
        {
            label: "Date", accessor: "posting_date", sortable: true, type: "date"
        },
        {
            label: "Quantity", accessor: "total_qty", sortable: true, type: "float"
        },
        { label: "Grand Total", accessor: "grand_total", sortable: true, width: 20, type: "currency" },
        { label: "Amount", accessor: "paid_amount", sortable: true, type: "currency" },
        { label: "Due Amount", accessor: "outstanding_amount", sortable: true, type: "currency" },
        {
            label: "Status", accessor: "status", sortable: true,
            renderCell: (value) => {
                return (
                    <Badge radius="medium" color={value == "Pending" ? "yellow" : value == "Paid" ? "green" : value == "Partial" ? "blue" : "red"}>
                        {value}
                    </Badge>)
            }
        },
    ]
    return (
        <div className="px-4">
            <div>
                <div className="text-lg font-semibold ">POS Invoice</div>
            </div>
            <div></div>

            <div className="mt-4">
                <table className='w-full border'>
                    <thead>
                        <tr>
                            {columns.map((column, i) => (
                                <th key={i} className="text-left text-sm font-semibold px-2 py-2">{column.label}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {invoiceData.map((row, i) => (
                            <tr key={i} className="">
                                {columns.map((column, j) => (
                                    <td key={j} className="px-2 py-2 text-sm">{row[column.accessor]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page;
