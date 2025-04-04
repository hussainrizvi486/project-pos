import { BASE_API_URL } from "@api/index";
import { DataForm } from "@components/data-form";
import axios from "axios";
import { ConeIcon } from "lucide-react";
import { Params, useNavigate, useParams } from "react-router-dom";


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

const getItem = async (params: Readonly<Params<string>>) => {
    const request = await axios.get(BASE_API_URL + "/pos/api/item/get?id=" + params.id);
    const { data } = request;

    data.category = {
        label: data.category?.name,
        value: data.category?.id
    }

    data.default_uom = {
        label: data.default_uom?.name,
        value: data.default_uom?.id
    }

    console.log(data);
    return data
}

const Index = () => {
    const params = useParams();

    if (params.id) {
        getItem(params);
    }

    // const navigation = useNavigate();

    function handleSave(values) {

        const data = values;
        data.default_uom = data.default_uom.value;
        data.category = data.category.value;
        console.log(data);
        const payload = new FormData();

        for (const [key, value] of Object.entries(data)) {
            payload.append(key, value);
        }
        axios.post(BASE_API_URL + "/pos/api/items", payload).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })


        // navigation("/")
    }
    const defaultValues = {
        "image": "http://localhost:8000/media/51ySu55JzAL.__AC_SX300_SY300_QL70_FMwebp_.webp",
        "id": "1",
        "item_variant": [],
        "item_name": "Logitech G Pro Wireless Gaming Mouse",
        "category": {
            "id": "2",
            "name": "Mouse"
        },
        "description": "About this item\r\nMade with ",
        "uom": {
            "name": "Pieces",
            "id": "3e77cb10-e858-438d-b2bd-d2063e377cec"
        },
        "disabled": false,
        "variant_of": null,
        "item_type": "product",
        "default_uom": "3e77cb10-e858-438d-b2bd-d2063e377cec"
    }

    return (
        <div>
            <div className="mb-2">
                <div className="text-lg font-semibold">Create Item</div>
            </div>

            <DataForm formFields={fields} onSave={handleSave} values={defaultValues} />
        </div>
    )
}

export default Index;