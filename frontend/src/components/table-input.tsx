import { useState } from "react";
import { FormFieldType } from "./data-form";
import { FileText, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { AutoComplete } from "./ui/autocomplete";

type TableInputField = FormFieldType;
type Value = string | number | undefined | null;

interface TableInputProps {
    onChange?: (data: Array<Record<string, Value>>) => void;
    label?: string;
    defaultValue?: Array<Record<string, Value>> | any;
    fields: Array<TableInputField>;
}

const FormField: React.FC<{
    field: FormFieldType;
}> = ({ field }) => {
    const renderFieldByType = () => {
        const commonProps = {
            ...field,
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            className: "border-none h-full py-1.5 px-2 rounded-none shadow-none mt-0"
        };

        switch (field.type) {
            // case "text":
            // return <Input type="text" {...commonProps} />;
            case "number" | "float":
                return <Input {...commonProps} />;
            case "autocomplete":
                return <AutoComplete {...field} className="py-1.5 px-2" />;
            default:
                return <Input type="text" {...commonProps} />;
        }
    };

    return (
        <div>
            {renderFieldByType()}
        </div>
    );
};

const EmptyTable = () => {
    return (
        <div className="py-4 flex justify-center">
            <div className="flex flex-col items-center">
                <FileText className="stroke-gray-400" />
                <div className="text-sm text-center">
                    No Data
                </div>
            </div>
        </div>
    )
}

export const TableInput: React.FC<TableInputProps> = ({ fields, onChange }) => {
    const [data, setData] = useState<Array<Record<string, string | number | undefined | null>>>([]);

    const handleAdd = () => {
        setData([...data, {}]);
    }

    const handleDelete = (index: number) => {
        setData(data.filter((_, i) => i !== index));
    }


    const handleChange = () => {

    }
    // const handleChange = ({ index, field, value }: { index: number, field: TableInputField, value: string | number }) => {
    //     const values = [...data];
    //     values[index] = { ...values[index], [field.name]: value };
    //     setData(values);
    //     onChange?.(values);
    // }
    return (
        <div>
            <div className="border rounded-md">
                <div className="bg-gray-50">
                    <div className="flex">
                        <div className="basis-1/12 px-2 flex items-center justify-center">
                            <div className="text-sm">No.</div>
                        </div>
                        {fields.map((field) => (
                            <div key={field.name} className="basis-full">
                                <div className="text-sm px-2 py-2 border-x ">
                                    {field.label}
                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                </div>
                            </div>
                        ))}
                        <div className="basis-1/12"></div>
                    </div>
                </div>


                {
                    !data || data?.length == 0 ? <EmptyTable /> : data.map((_, i) => (
                        <div className="border-b last:border-none" key={i}>
                            <div className="flex items-center">

                                <div className="basis-1/12 px-2">
                                    <div className="text-sm text-center">{i + 1}</div>
                                </div>

                                {fields.map((field, j) => (
                                    <div className="basis-full " key={j}>
                                        <div className="border-x">
                                            <div className="focus-within:ring-1 focus-within:ring-primary/50 ">
                                                <FormField
                                                    field={field}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="basis-1/12">
                                    <div className="flex justify-center">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(i)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>


            <div className="mt-4 flex justify-end">
                <button onClick={handleAdd} className="text-xs px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded"
                    type="button" role="button"
                >
                    Add Row
                </button>
            </div>
        </div>
    )

}