import { Checkbox } from "@components/ui/checkbox";
import React, { useState } from "react";

type RowData = { [key: string]: string };

const initialFields = ["name", "age", "email"]; // Define fields dynamically

export const ArrayForm = () => {
    const [formData, setFormData] = useState<RowData[]>([
        Object.fromEntries(initialFields.map((field) => [field, ""]))
    ]);


    const handleChange = (index: number, field: string, value: string) => {
        const updatedRows = [...formData];
        updatedRows[index][field] = value;
        setFormData(updatedRows);
    };

    const handleAddRow = () => {
        setFormData([...formData, Object.fromEntries(initialFields.map((field) => [field, ""]))]);
    };

    const handleRemoveRow = (index: number) => {
        setFormData(formData.filter((_, i) => i !== index));
    };

    return (
        <div>
            <table className="border border-gray-300 w-full">
                <thead>
                    <tr>

                        <th className="border border-gray-300 text-sm"><Checkbox /></th>
                        {initialFields.map((field) => (
                            <th className="border border-gray-300 text-sm" key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {formData.map((row, index) => (
                        <tr key={index}>
                            <td></td>
                            {initialFields.map((field) => (
                                <td key={field} className="border">
                                    <input
                                        type={field === "email" ? "email" : "text"}
                                        name={field}
                                        value={row[field]}
                                        onChange={(e) => handleChange(index, field, e.target.value)}
                                    />
                                </td>
                            ))}
                            <td>
                                <button type="button" onClick={() => handleRemoveRow(index)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={handleAddRow}>
                Add Row
            </button>
        </div>
    );
};
