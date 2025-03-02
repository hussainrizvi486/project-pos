import React from "react";
import { cn } from "@utils";


const DEFAULT_PLACEHOLDERS = {
    "text": "Enter text",
    "textarea": "Enter text",
    "number": "0",
    "float": "0.00",
}

const DEFAULT_PRECISION = 0;

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


interface InputProps {
    name: string
    placeholder?: string
    className?: string
    required?: boolean
    type: "text" | "float" | "number"
    precision?: number,
    onChange?: (value: any) => void
    onBlur?: (value: any) => void
}

function decimal(value: any, precision = 2) {
    console.log(precision)
    const v = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    return v.toFixed(precision);
}



const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const precision = props.precision || DEFAULT_PRECISION;


    function parseValue(value: any) {
        switch (props.type) {
            case "text":
                return value;

            case "float":
                return decimal(value, precision);

            case "number":

                return isNaN(parseInt(value)) ? 0 : parseInt(value);
            default:
                return value;
        }

    };

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        const parsedValue = parseValue(value);

        if (props.onChange) {
            props.onChange(parsedValue);
        }
    }


    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        e.target.value = parseValue(e.target.value);;
        if (props.onBlur) {
            props.onBlur(parseValue(e.target.value));
        }
    }

    return (
        <input
            type="text"
            ref={ref}
            name={props.name}
            placeholder={props.placeholder || DEFAULT_PLACEHOLDERS[props.type]}
            onChange={handleChange}
            onBlur={handleBlur}
            required={props.required}
            className={cn("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm")}
        />
    )
})


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


    interface FormFieldType {
        label: string
        required?: boolean
        name: string
        placeholder?: string
        type: "text" | "textarea" | "date" | "select" | "number"
        options?: Array<{ label: string, value: string }>
    }



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
        </div>
    );
};
