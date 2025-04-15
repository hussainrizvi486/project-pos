
import React, { useEffect, useState } from "react";
import { Input } from "@components/ui/input";
import { TableInput } from "@components/table-input";
import { AutoComplete } from "@components/ui/autocomplete";
import { TextEditor } from "@components/ui/text-editor";
import { Checkbox } from "@components/ui/checkbox";



export interface FieldType {
    fields: FieldType[];
    label: string;
    onChange?: (value: string) => void;
    name: string;
    required?: boolean;
    placeholder?: string;
    type: "text" | "textarea" | "date" | "select" | "number" | "autocomplete" | "float" | "table" | "texteditor" | "checkbox" | "file";
    getOptions?: () => Promise<{ label: string; value: string }[]>;
    renderOption: () => React.ReactNode;
    value?: string | number | boolean;
    options?: Array<{ label: string; value: string }>;
}


interface FieldProps {
    field: FieldType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, field: FieldType) => void;
    state: { hasError: boolean; error?: string };
}


export const FormField: React.FC<FieldProps> = ({ field, onChange, state }) => {
    const { hasError, error } = state;

    const handleChange = (value: string) => {
        onChange(value, field);
        field.onChange?.(value);
    };

    const Field = () => {
        const props = {
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            className: "py-1.5 px-2",
            onChange: handleChange,
        };


        if (["text", "number", "float", "file"].includes(field.type)) {
            return <Input type={field.type} {...props} />;
        }

        else if (field.type === "autocomplete") {
            return <AutoComplete options={field.options} renderOption={field.renderOption}
                value={field.value}
                getOptions={field.getOptions}
                className="py-1.5 px-2" />
        }

        else if (field.type === "checkbox") {
            return <Checkbox name={field.name} onChange={(e) => { console.log(e) }} className={defaultProps.className} required={field.required} />;
        }

        else if (field.type == "table") {
            return <TableInput fields={field.fields} label={field.label} onChange={field.onChange} />;
        }

        // switch (field.type) {
        //     case "text":
        //         return <Input type="text" {...defaultProps} />;
        //     case "number":
        //         return <Input type="number" {...defaultProps} />;
        //     case "float":
        //         return <Input type="float"  {...defaultProps} />;
        //     case "file":
        //         return <Input type="file"  {...defaultProps} />;

        //     case "autocomplete":
        //         return <AutoComplete {...field} {...defaultProps} className="py-1.5 px-2" />;
        //     case "texteditor":
        //         return <TextEditor {...field} {...defaultProps} />;
        //     case "table":
        //         return <TableInput fields={field.fields} label={field.label} onChange={field.onChange} />;
        //     case "checkbox":
        //         return <Checkbox name={field.name} onChange={(e) => { console.log(e) }} className={defaultProps.className} required={field.required} />;

        //     default:
        //         return <Input type="text" {...defaultProps} />;
    }
    // };


    // if (field.type == "checkbox") {
    //     return (
    //         <div className="mb-1">
    //             <div className="flex items-center gap-2">
    //                 <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
    //                     <Field />
    //                 </div>
    //                 <label className="block text-sm font-medium text-gray-700" htmlFor={field.name}>
    //                     {field.label}  {field.required && <span className="text-destructive">*</span>}
    //                 </label>
    //             </div>
    //             <div className="">
    //                 {hasError && error && <div className="text-destructive text-xs mt-1 ml-1">{error}</div>}
    //             </div>
    //         </div>
    //     );

    // }
    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}  {field.required && <span className="text-destructive">*</span>}
            </label>
            <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
                <Field />
            </div>
            <div className="">
                {hasError && error && <div className="text-destructive text-xs mt-1 ml-1">{error}</div>}
            </div>
        </div>
    );
};
