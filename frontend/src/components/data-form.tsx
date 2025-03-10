import React from "react";
// import { cn, decimal } from "@utils";
import { CircleX } from "lucide-react";
import { Input } from "@components/ui/input";



interface FormFieldType {
    label: string
    required?: boolean
    name: string
    placeholder?: string
    type: "text" | "textarea" | "date" | "select" | "number"
    options?: Array<{ label: string, value: string }>
}


const formFields = [
    {
        label: "Details",
        columns: [
            [
                {
                    label: "Customer",
                    type: "text",
                    name: "customer",
                    placeholder: "Enter customer name",
                    required: true,
                },
                {
                    label: "Company",
                    type: "text",
                    name: "company",
                    placeholder: "Enter company name",
                    required: true,
                },
                {
                    label: "Posting Date",
                    type: "date",
                    name: "posting_date",
                    required: true,
                },
            ],
            [
                {
                    label: "Customer Address",
                    type: "textarea",
                    name: "customer_address",
                    placeholder: "Enter customer address",
                },
                {
                    label: "Company Address",
                    type: "textarea",
                    name: "company_address",
                    placeholder: "Enter company address",
                },
            ],
        ],
    },
    {
        label: "Taxes and Charges",
        columns: [
            [
                {
                    label: "Tax Template",
                    type: "select",
                    name: "tax_template",
                    options: [
                        { label: "VAT", value: "vat" },
                        { label: "GST", value: "gst" },
                    ],
                    required: true,
                },
                {
                    label: "Tax Amount",
                    type: "number",
                    name: "tax_amount",
                    required: true,
                },
            ],
        ],
    },
    {
        label: "Totals",
        columns: [
            [],
            [
                {
                    label: "Net Total",
                    type: "float",
                    name: "net_total",
                    required: true,
                },
                {
                    label: "Grand Total",
                    type: "float",
                    name: "grand_total",
                    required: true,
                },
                {
                    label: "Outstanding Amount",
                    precision: 3,
                    type: "float",
                    name: "outstanding_amount",
                    required: true,
                },
            ],
        ],
    },
];






const FormSection = ({ children }) => {
    return (
        <div className="mb-4 border-b py-4">
            {children}
        </div>
    )
}

const FormColumn = ({ children }) => {
    return (
        <div className="basis-full">
            {children}
        </div>
    )
}

export const DataForm = () => {

    const renderField = ({ field }: { field: FormFieldType }) => {
        switch (field.type) {
            case "text":
                return <Input {...field} />
            case "number":
                return (<Input {...field} />)

            default:
                return (<Input {...field} />)
        }

    }


    return (
        <div className="px-2">
            <form className="mt-4">
                {formFields.map((section, index) => {
                    const { columns, label } = section
                    return (
                        <div key={index}>
                            <FormSection key={index}>
                                <h2 className="text-lg font-semibold mb-2">{label}</h2>
                                <div className="flex gap-x-2">
                                    {columns.map((columns, index) => {
                                        return (
                                            <FormColumn key={index}>

                                                {columns.map((field, index) => (
                                                    <div key={index} className="mb-4">
                                                        <label className="block mb-2 text-sm font-medium text-gray-700">{field.label}</label>
                                                        {renderField({ field })}
                                                    </div>
                                                ))}
                                            </FormColumn>
                                        )
                                    })}
                                </div>
                            </FormSection>
                        </div>
                    )
                })}
            </form>


            <button className="inline-flex cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-400">
                <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Save
            </button>
        </div>
    );
};



interface TableInputProps {
    columns: Array<FormFieldType>;
    value: Array<Record<string, any>>;
    onChange: (value: Array<Record<string, any>>) => void;
}

export const TableInput: React.FC<TableInputProps> = ({ columns, value = [], onChange }) => {
    const handleAddRow = () => {
        const newRow = columns.reduce((acc, column) => {
            acc[column.name] = "";
            return acc;
        }, {} as Record<string, any>);
        onChange([...value, newRow]);
    };

    const handleRemoveRow = (index: number) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange(newValue);
    };

    const handleCellChange = (rowIndex: number, columnName: string, cellValue: any) => {
        const newValue = [...value];
        newValue[rowIndex] = {
            ...newValue[rowIndex],
            [columnName]: cellValue
        };
        onChange(newValue);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {value.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                                    <Input
                                        {...column}
                                        value={row[column.name] || ""}
                                        onChange={(val) => handleCellChange(rowIndex, column.name, val)}
                                    />
                                </td>
                            ))}
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRow(rowIndex)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <CircleX />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-2">
                <button
                    type="button"
                    onClick={handleAddRow}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                    Add Row
                </button>
            </div>
        </div>
    );
};
