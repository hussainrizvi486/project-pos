import React from "react";
import { decimal, cn } from "@utils/index";

const DEFAULT_PRECISION = 2;
const DEFAULT_PLACEHOLDERS = {
    "text": "Enter text",
    "textarea": "Enter text",
    "number": "0",
    "float": "0.00",
}

interface InputProps {
    name: string
    placeholder?: string
    className?: string
    value?: string,
    required?: boolean
    type: "text" | "float" | "number"
    precision?: number,
    onChange?: (value: any) => void
    onBlur?: (value: any) => void
}

const INPUT_CLASS_TYPE = {
    "text": "text-left",
    "number": "text-right",
    "float": "text-right",
}


const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const precision = props.precision || DEFAULT_PRECISION;

    function parseValue(value) {
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
            // required={props.required}
            defaultValue={props.value}
            className={cn("block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm ", INPUT_CLASS_TYPE[props.type], props.className || "")}

        />
    )
})


export { Input };