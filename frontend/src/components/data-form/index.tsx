/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { FieldType } from "./field";
import { FormProvider, useForm } from "react-hook-form";




const Section: React.FC<{
    children: React.ReactNode; label: string;
}> = ({ children, label }) => (
    <div className="mb-4 border-b py-4" >
        <h2 className="text-lg font-semibold mb-2" > {label} </h2>
        {children}
    </div>
);


const Column: React.FC<{ children: React.ReactNode; }> = ({ children }) => (
    <div className="basis-full" >
        {children}
    </div>
);








interface DataFormProps {
    fields: Array<{
        "label": string;
        "columns"?: Array<Array<FieldType>>;
    }>;

    values?: {
        [key: string]: any;
    }
}


export const DataForm: React.FC<DataFormProps> = () => {
    const form = useForm();


    return (
        <div>
            <FormProvider {...form}>

                <form ></form>
            </FormProvider>
        </div>
    )
}