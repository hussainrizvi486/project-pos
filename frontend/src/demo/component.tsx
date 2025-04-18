
import * as React from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select"
import { Input } from "@components/ui/input"


export const DemoComponent = () => {
    return (
        <div className="p-2">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <SelectDemo />
                </div>

                <div>
                    <InputDemo />
                </div>

            </div>
        </div>
    )
}


function SelectDemo() {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

function InputDemo() {
    return (
        <div>
            <Input />
        </div>
    )
}

