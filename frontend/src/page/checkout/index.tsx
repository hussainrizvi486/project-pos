import { ArrayForm } from "@components/form"
import { Header } from "@components/layouts";
import { Combobox } from "@components/ui/combobox";
import { Input } from "@components/ui/input";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getSummary } from "@features/pos/reducers/summary";
import { decimal, float } from "@utils/index";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import moment from "moment";
import { BASE_API_URL } from "@api/index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const Index = () => {
    const navigate = useNavigate();
    const data = useSelector(getSummary);
    const { customer } = data;


    const invoiceMutation = useMutation({
        mutationKey: ["createInvoice"],
        mutationFn: async (payload) => {
            const request = await axios.post(BASE_API_URL + "/pos/api/order/create", payload);
            return request.data;
        }
    })

    const makeInvoice = () => {
        const items = data?.summaryItems.map(val => (
            {
                "item": val.id,
                "net_rate": val.price,
                "qty": val.quantity,
                "discount": 0,
                "uom": null
            }
        ))

        const payload = {
            "customer": "ee2a5368-3681-4239-a33a-80f3634ddc04",
            "items": items,
            "posting_date": moment(),
        }

        invoiceMutation.mutate(payload); fP
    }

    if (invoiceMutation.isSuccess) {
        toast("Invoice has been created");
        navigate("/")
    }

    return (
        <div>
            <div className="flex">
                <div className="basis-1/3 shrink-0 px-4 py-4">
                    <div>
                        <div className="text-sm mb-4 ml-1">
                            <div className="font-semibold ">Customer</div>
                            <div className="text-gray-600">
                                {customer?.label}
                            </div>
                        </div>

                        <Numpad />
                        <div>
                            <div className="grid grid-cols-2 mt-4 gap-2">
                                <button className=" px-4 py-2 bg-gray-800 text-white text-sm rounded-md"
                                    onClick={makeInvoice}
                                >Save</button>
                                <button className=" px-4 py-2 bg-gray-800 text-white text-sm rounded-md">Print</button>
                                <button className=" col-span-2 px-4 py-2 bg-gray-800 text-white text-sm rounded-md w-full">Save & Print</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex-auto">
                    <CheckoutPaymentHandler makeInvoice={makeInvoice} />
                </div>

            </div>
        </div>
    )
}



const CheckoutPaymentHandler = ({ makeInvoice }) => {

    const data = useSelector(getSummary);
    const { grandTotal, taxAmount, totalQty } = data;
    const modeOfPayment = [
        {
            "name": "Cash",
            "value": "cash",
            "amount": grandTotal
        },
        {
            "name": "Credit Card",
            "value": "credit_card",
            "amount": 0
        }
    ]

    console.log(modeOfPayment)

    const [payments, setPayments] = useState(modeOfPayment.map(item => ({ ...item })));
    if (!data) return null;


    const handlePayment = (name: string, value: string) => {
        setPayments(prev => {
            const index = prev.findIndex(item => item.name === name);
            if (index > -1) {
                prev[index].amount = float(value);
            }
            return [...prev];
        });
    }

    const totalPaid = payments.reduce((sum, item) => sum + item.amount, 0);
    const change = totalPaid > float(grandTotal) ? totalPaid - float(grandTotal) : 0;
    const remaining = totalPaid < float(grandTotal) ? float(grandTotal) - totalPaid : 0;


    const vatAmount = 0
    const serviceTaxAmount = 0



    const handleSave = () => {
        makeInvoice();
    }

    return (
        <div className="px-6">
            <div className="mb-4">
                <div className="text-lg font-semibold text-center">
                    Grand Total: ${float(grandTotal)}
                </div>
            </div>

            <div className="font-semibold mb-2">
                Payments
            </div>
            <table className="w-full">
                <tbody>
                    {modeOfPayment.map((item, i) => (
                        <tr key={i}>
                            <td className="align-middle w-32">
                                <div className="font-medium py-0.5 text-gray-600 text-sm">
                                    {item.name}
                                </div>
                            </td>
                            <td className="align-middle">
                                <div>
                                    <Input
                                        name="amount"
                                        type="number"
                                        className="px-4 py-1"
                                        value={item.amount || '0.00'}
                                        onChange={(value) => handlePayment(item.name, value)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* tax break up */}
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <th colSpan={2} className="text-sm font-medium text-gray-500 text-left pb-1">
                            Tax Break-up
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr>
                        <td className="text-gray-600 py-0.5">VAT (5%)</td>
                        <td className="text-right">${decimal(vatAmount)}</td>
                    </tr>
                    <tr>
                        <td className="text-gray-600 py-0.5">Service Tax (2%)</td>
                        <td className="text-right">${decimal(serviceTaxAmount)}</td>
                    </tr>
                    <tr>
                        <td className="font-medium py-0.5">Total Tax</td>
                        <td className="text-right font-medium">${decimal(taxAmount)}</td>
                    </tr>
                </tbody>
            </table>

            <table className="w-full mt-4">
                <tbody className="text-sm">
                    <tr>
                        <td className="text-gray-600 py-0.5">Paid Amount</td>
                        <td className="text-right">${decimal(totalPaid)}</td>
                    </tr>
                    <tr>
                        <td className="text-gray-600 py-0.5">Change</td>
                        <td className="text-right">${decimal(change)}</td>
                    </tr>
                    <tr>
                        <td className="text-gray-600 py-0.5">Tax Amount</td>
                        <td className="text-right">${decimal(taxAmount)}</td>
                    </tr>
                    <tr>
                        <td className="font-medium py-0.5">Remaining</td>
                        <td className="text-right font-medium">${decimal(remaining)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const Numpad = () => {
    const [value, setValue] = useState('0');

    const numpad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [".", 0, "C"]
    ];

    const handleClick = (item: number | string) => {
        if (item === "C") {
            setValue('0');
        } else if (item === "." && value.includes('.')) {
            // Prevent multiple decimal points
            return;
        } else {
            setValue(prev => {
                if (prev === '0' && item !== '.') {
                    return item.toString();
                } else {
                    return prev + item;
                }
            });
        }
    };

    return (
        <div className="mb-4">
            <div className="mb-2 p-2 bg-white border text-right text-lg font-medium h-12 flex items-center justify-end">
                {value}
            </div>

            <div className="grid grid-cols-1 gap-1">
                {
                    numpad.map((row, i) => (
                        <div key={i} className="grid grid-cols-3 gap-1">
                            {
                                row.map((item, j) => (
                                    <div
                                        key={j}
                                        className="bg-gray-100 hover:bg-gray-200 hover:cursor-pointer text-center p-2"
                                        onClick={() => handleClick(item)}
                                    >
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};
export default Index;