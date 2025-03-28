/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import { Input } from "@components/ui/input";
import { TableInput } from "@components/table-input";
import { AutoComplete } from "@components/ui/autocomplete";


export const Spinner = () => {
    return (
        <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}

export interface FormFieldType {
    label: string;
    onChange?: (value: any) => void;
    name: string;
    required?: boolean;
    placeholder?: string;
    type: "text" | "textarea" | "date" | "select" | "number" | "autocomplete" | "float" | "table";
    options?: Array<{ label: string; value: string }>;
}

interface FormSection {
    label: string;
    columns: [][];
}

interface DataFormProps {
    formFields: FormSection[];
}

const FormField: React.FC<{
    field: FormFieldType;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, field: FormFieldType) => void;
    state: { hasError: boolean; error?: string };
}> = ({ field, onChange, state }) => {

    const { hasError, error } = state;


    const handleChange = (value: any) => {
        onChange(value, field);
        field.onChange?.(value);
    };

    const renderFieldByType = () => {
        const commonProps = {
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            className: "py-1.5 px-2",
            onChange: handleChange,
        };

        switch (field.type) {
            case "text":
                return <Input type="text" {...commonProps} />;
            case "number":
                return <Input type="number" {...commonProps} />;
            case "float":
                return <Input type="float"  {...commonProps} />;
            case "autocomplete":
                return <AutoComplete {...field} {...commonProps} className="py-1.5 px-2" />;
            case "table":
                return <TableInput {...field} />;
            default:
                return <Input type="text" {...commonProps} />;
        }
    };

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


const FormSection: React.FC<{
    children: React.ReactNode; label: string;
}> = ({ children, label }) => (
    <div className="mb-4 border-b py-4" >
        <h2 className="text-lg font-semibold mb-2" > {label} </h2>
        {children}
    </div>
);

const FormColumn: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
    <div className="basis-full shrink-0 max-w-lg" >
        {children}
    </div>
);



const getFieldState = (fields: FormFieldType[]) => {
    const state = {};
    for (const field of fields) {
        state[field.name] = {
            df: field,
            value: "",
            error: "",
            hasError: false,
        }
    }
    return state;
}

const getFieldsArray = (fields) => {
    const data = []
    for (const i of fields) {
        for (const j of i.columns) {
            for (const k of j) {
                data.push(k)
            }
        }
    }

    return data
}

export const DataForm: React.FC<DataFormProps> = ({ formFields, onSave }) => {
    const fieldsArray = getFieldsArray(formFields);
    const [fieldState, setFieldState] = useState(getFieldState(fieldsArray));
    const [data, setData] = useState({});



    const updateFieldState = (name: string, value: object) => {
        setFieldState((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                ...value,
            },
        }));
    }

    const handleChange = (value: any, field: FormFieldType) => {
        setData({ ...data, [field.name]: value });
        updateFieldState(field.name, { value: value });
    }


    const validateForm = () => {
        let validated = true;
        for (const field of fieldsArray) {

            const value = data[field.name];

            if (field.required && !value) {
                validated = false;
                updateFieldState(field.name, {
                    error: "This field is required",
                    hasError: true,
                });
            } else {
                updateFieldState(field.name, {
                    error: "",
                    hasError: false,
                });
            }
        }
        return validated;
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateForm()) {
            return
        }

        onSave?.(data);
    }


    return (
        <div>
            <form onSubmit={handleSave}>
                {formFields?.map((section, sectionIndex) => (
                    <FormSection key={sectionIndex} label={section.label}>
                        <div className="flex gap-x-2">
                            {section.columns.map((column, columnIndex) => {
                                const fields = column;
                                return (
                                    <FormColumn key={columnIndex}>
                                        {fields?.map((field, fieldIndex) => (
                                            <div className="mb-4" key={fieldIndex}>
                                                <FormField
                                                    field={field}
                                                    state={fieldState[field.name]}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                        ))}
                                    </FormColumn>
                                )
                            })}
                        </div>
                    </FormSection>
                ))}
                <button type="submit"
                    className="inline-flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm leading-6 font-semibold text-primary-foreground transition duration-150 ease-in-out hover:bg-gray-700"
                >
                    {/* <Spinner /> */}
                    Save</button>
            </form>

        </div>
    );
};



