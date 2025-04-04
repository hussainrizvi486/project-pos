import { BASE_API_URL } from "@api/index";
import { DataForm } from "@components/data-form";
import { TextEditor } from "@components/ui/text-editor";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const fields = [
    {
        "label": "",
        "columns": [
            [
                {
                    "label": "Image",
                    "name": "image",
                    "type": "file",
                    // "required": true,
                    // "placeholder": "Enter name",
                },
                {
                    "label": "Item Name",
                    "name": "item_name",
                    "type": "text",
                    "required": true,
                    "placeholder": "Enter name",
                },
                {
                    "label": "Category",
                    "name": "category",
                    "type": "autocomplete",
                    "required": true,
                    "placeholder": "Select category",
                    getOptions: async () => {
                        const request = await axios.get(BASE_API_URL + "/pos/api/query/category");
                        const options = request.data.map((val) => ({
                            label: val.name,
                            value: val.id
                        }))
                        return options;

                    },
                },
                {
                    label: "Price",
                    name: "price",
                    type: "float",
                    required: true,
                },
                {
                    label: "Description",
                    name: "decription",
                    type: "texteditor",
                },
                {
                    label: "Disabled",
                    name: "disabled",
                    type: "checkbox",
                },
                {
                    label: "UOM",
                    name: "default_uom",
                    required: true,
                    type: "autocomplete",
                    getOptions: async () => {
                        const request = await axios.get(BASE_API_URL + "/pos/api/query/uom");
                        const options = request.data.map((val) => ({
                            label: val.name,
                            value: val.id
                        }))
                        return options;

                    },
                }
            ],
        ],
    }
]

const Index = () => {
    const navigation = useNavigate();
    function handleSave(values) {
        console.log(values);
        // navigation("/")
    }

    return (
        <div>
            <div className="mb-2">
                <div className="text-lg font-semibold">Create Item</div>
            </div>
            {/* <TextEditor /> */}
            <DataForm formFields={fields} onSave={handleSave} />
        </div>
    )
}

export default Index;