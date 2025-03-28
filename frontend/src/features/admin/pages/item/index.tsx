import { DataForm } from "@components/data-form";
import { useNavigate } from "react-router-dom";


const fields = [
    {
        "label": "",
        "columns": [
            [
                {
                    "label": "Name",
                    "name": "name",
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
                    "options": [
                        {
                            "label": "Category 1",
                            "value": "1"
                        },
                        {
                            "label": "Category 2",
                            "value": "2"
                        }
                    ]
                },
                {
                    label: "Price",
                    name: "price",
                    type: "float",
                    required: true,
                }
            ],
        ],
    }
]

const Index = () => {
    const navigation = useNavigate();
    function handleSave(values) {
        console.log(values);
        navigation("/")
    }

    return (
        <div>
            <div className="mb-2">
                <div className="text-lg font-semibold">Create Item</div>
            </div>

            <DataForm formFields={fields} onSave={handleSave} />
        </div>
    )
}

export default Index;