import { ArrayForm } from "@components/form"
import { Header } from "@components/layouts";
import { Combobox } from "@components/ui/combobox";
import { Input } from "@components/ui/input";

const Index = () => {
    const modeOfPayment = [
        {
            "name": "Cash",
            "value": "cash"
        },
        {
            "name": "Credit Card",
            "value": "credit_card"
        }
    ]
    return (
        <div>
            <div className="flex">
                <div className="basis-1/3 shrink-0 px-4 py-4">
                    <div>
                        <div className="text-sm font-semibold mb-2 ml-1">Customer</div>
                        {/* <Combobox placeholder="Select Customer" /> */}
                        <Numpad />
                    </div>
                </div>

                <div className="flex-auto">
                    <div className="px-6">
                        <div className="mb-4">
                            <div className="text-lg font-semibold text-center">
                                Grand Total: $100
                            </div>
                        </div>

                        <table className="w-full">
                            <tbody>
                                {
                                    modeOfPayment.map((item, i) => (
                                        <tr key={i} >
                                            <td className="align-middle w-32">
                                                <div className="font-semibold text-sm">{item.name}</div>
                                            </td>
                                            <td className="align-middle">
                                                <div>
                                                    <Input name="amount" type="float" className="p-0" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <div className="mt-4">
                            <div className="text-lg font-semibold text-center">
                                Change: $100
                            </div>

                            <div className="text-lg font-semibold text-center">
                                Remaining: $100
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}



const Numpad = () => {
    const numpad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [".", 0, "C"]
    ]
    return (
        <div>

            <div className="grid grid-cols-1 gap-1">
                {
                    numpad.map((row, i) => (
                        <div key={i} className="grid grid-cols-3 gap-1">
                            {
                                row.map((item, j) => (
                                    <div key={j} className="bg-gray-100 hover:bg-gray-200 hover:cursor-pointer text-center p-2">
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )

}
export default Index;