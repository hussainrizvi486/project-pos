
import React, { useEffect, useState } from "react";
import { Input } from "@components/ui/input";
import { TableInput } from "@components/table-input";
import { AutoComplete } from "@components/ui/autocomplete";
import { TextEditor } from "@components/ui/text-editor";
import { Checkbox } from "@components/ui/checkbox";



export interface FormFieldType {
    fields: FormFieldType[];
    label: string;
    onChange?: (value: any) => void;
    name: string;
    required?: boolean;
    placeholder?: string;
    type: "text" | "textarea" | "date" | "select" | "number" | "autocomplete" | "float" | "table" | "texteditor" | "checkbox" | "file";
    getOptions?: () => Promise<{ label: string; value: string }[]>;
    value?: string | number | boolean;
    options?: Array<{ label: string; value: string }>;
}


interface FormFieldProps {
    field: FormFieldType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, field: FormFieldType) => void;
    state: { hasError: boolean; error?: string };
}


export const FormField: React.FC<FormFieldProps> = ({ field, onChange, state }) => {
    const { hasError, error } = state;


    const handleChange = (value: any) => {
        onChange(value, field);
        field.onChange?.(value);
    };

    const Field = () => {
        const defaultProps = {
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            className: "py-1.5 px-2",
            onChange: handleChange,
        };

        switch (field.type) {
            case "text":
                return <Input type="text" {...defaultProps} />;
            case "number":
                return <Input type="number" {...defaultProps} />;
            case "float":
                return <Input type="float"  {...defaultProps} />;
            case "file":
                return <Input type="file"  {...defaultProps} />;

            case "autocomplete":
                return <AutoComplete {...field} {...defaultProps} className="py-1.5 px-2" />;
            case "texteditor":
                return <TextEditor {...field} {...defaultProps} />;
            case "table":
                return <TableInput fields={field.fields} label={field.label} onChange={field.onChange} />;
            case "checkbox":
                // {...field}
                // {...defaultProps}
                return <Checkbox name={field.name} onChange={field.onChange} className={defaultProps.className} required={field.required} />;

            default:
                return <Input type="text" {...defaultProps} />;
        }
    };


    if (field.type == "checkbox") {
        return (
            <div className="mb-1">
                <div className="flex items-center gap-2">
                    <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
                        <Field />
                    </div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor={field.name}>
                        {field.label}  {field.required && <span className="text-destructive">*</span>}
                    </label>
                </div>
                <div className="">
                    {hasError && error && <div className="text-destructive text-xs mt-1 ml-1">{error}</div>}
                </div>
            </div>
        );

    }
    return (
        <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
                {field.label}  {field.required && <span className="text-destructive">*</span>}
            </label>
            <div className={`rounded-md ${hasError ? "border border-destructive" : ""}`}>
                {renderFieldByType()}
            </div>
            <div className="">
                {hasError && error && <div className="text-destructive text-xs mt-1 ml-1">{error}</div>}
            </div>
        </div>
    );
};
