import { DataForm } from "@components/data-form";


const InvoiceForm = [
    {
        label: "Details",
        columns: [
            [
                {
                    label: "Select Customer",
                    type: "autocomplete",
                    name: "customer",
                    placeholder: "Enter customer name",
                    required: true,
                    options: [
                        {
                            label: 'John Doe',
                            value: 'john-doe',
                            image: 'https://randomuser.me/api/portraits/men/59.jpg',
                        },
                        {
                            label: 'Jane Doe',
                            value: 'jane-doe',
                            image: 'https://randomuser.me/api/portraits/women/58.jpg',
                        },
                        {
                            label: 'John Smith',
                            value: 'john-smith',
                            image: 'https://randomuser.me/api/portraits/men/59.jpg',
                        },
                        {
                            label: 'Jane Smith',
                            value: 'jane-smith',
                            image: 'https://randomuser.me/api/portraits/women/59.jpg',
                        },
                        {
                            label: 'John Wayne',
                            value: 'john-wayne',
                            image: 'https://randomuser.me/api/portraits/men/57.jpg',
                        },
                        {
                            label: 'Jane Wayne',
                            value: 'jane-wayne',
                            image: 'https://randomuser.me/api/portraits/women/51.jpg',
                        },
                    ]

                },
                {
                    label: "Company",
                    type: "text",
                    name: "company",
                    placeholder: "Enter company name",
                    required: true,
                },
                {
                    label: "Posting Date",
                    type: "date",
                    name: "posting_date",
                    required: true,
                },
            ],
            [
                {
                    label: "Customer Address",
                    type: "textarea",
                    name: "customer_address",
                    placeholder: "Enter customer address",
                },
                {
                    label: "Company Address",
                    type: "textarea",
                    name: "company_address",
                    placeholder: "Enter company address",
                },
            ],
        ],
    },
    {
        label: "Items",
        columns: [
            [
                {
                    "label": "Items",
                    "type": "table",
                    "name": "items",
                    "required": true,
                    "fields": [
                        {
                            "label": "Item Name",
                            "name": "item",
                            "type": "autocomplete",
                            "required": true,
                            renderOption: (option) => {
                                return (
                                    <div className="flex items-center text-sm p-1 hover:bg-slate-200">
                                        <img src={option?.image} alt={option?.label} className="w-6 h-6 rounded-full " />
                                        <span className="ml-2">{option?.label}</span>
                                    </div>
                                )

                            },
                            "options": [
                                {
                                    "label": "Item 1",
                                    "value": "item-1",
                                    "image": "https://randomuser.me/api/portraits/men/1.jpg"
                                },
                                {
                                    "label": "Item 2",
                                    "value": "item-2",
                                    "image": "https://randomuser.me/api/portraits/women/2.jpg"
                                },
                                {
                                    "label": "Item 3",
                                    "value": "item-3",
                                    "image": "https://randomuser.me/api/portraits/men/3.jpg"
                                },
                                {
                                    "label": "Item 4",
                                    "value": "item-4",
                                    "image": "https://randomuser.me/api/portraits/women/4.jpg"
                                },
                                {
                                    "label": "Item 5",
                                    "value": "item-5",
                                    "image": "https://randomuser.me/api/portraits/men/5.jpg"
                                },
                                {
                                    "label": "Item 6",
                                    "value": "item-6",
                                    "image": "https://randomuser.me/api/portraits/women/6.jpg"
                                },
                                {
                                    "label": "Item 7",
                                    "value": "item-7",
                                    "image": "https://randomuser.me/api/portraits/men/7.jpg"
                                },
                                {
                                    "label": "Item 8",
                                    "value": "item-8",
                                    "image": "https://randomuser.me/api/portraits/women/8.jpg"
                                },
                                {
                                    "label": "Item 9",
                                    "value": "item-9",
                                    "image": "https://randomuser.me/api/portraits/men/9.jpg"
                                },
                                {
                                    "label": "Item 10",
                                    "value": "item-10",
                                    "image": "https://randomuser.me/api/portraits/women/10.jpg"
                                }
                            ]
                        },
                        {
                            "label": "Quantity",
                            "name": 'quantity',
                            "type": "number",
                            "required": true
                        },
                        {
                            "label": "Rate",
                            "name": 'rate',
                            "type": "float",
                            "required": true
                        },
                        {
                            "label": "Amount",
                            "name": 'amount',
                            "type": "float",
                            "required": true
                        }
                    ]
                },

            ]
        ]
    },
    {
        label: "Totals",
        columns: [
            [],
            [
                {
                    label: "Net Total",
                    type: "float",
                    name: "net_total",
                    required: true,
                },
                {
                    label: "Grand Total",
                    type: "float",
                    name: "grand_total",
                    required: true,
                },
                {
                    label: "Outstanding Amount",
                    precision: 3,
                    type: "float",
                    name: "outstanding_amount",
                    required: true,
                },
            ],
        ],
    },
];


const Index = () => {

    const handleSave = (values) => {
        console.log(values);
    }

    return (
        <div>
            <div>
                <h1 className="mb-4 text-lg font-semibold" >Create Invoice</h1>
            </div>

            <DataForm formFields={InvoiceForm}
                onSave={handleSave}
            />
        </div>
    )
}


export default Index;