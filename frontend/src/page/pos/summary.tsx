import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner"
import { Command } from "cmdk";

import {
  getSummary,
  removeItem,
  updateItemQuantity,
  updateCustomer
} from "@features/pos/reducers/summary";

import { Check, ChevronsUpDown, FilePenLine, Minus, Plus, Trash2 } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@utils/index";
import { useNavigate } from "react-router-dom";


const fetchCustomer = async () => {
  const request = axios.get(import.meta.env.VITE_API_URL + "/pos/api/customer");
  return (await request).data;
}

export const Summary = () => {
  const dispatch = useDispatch();

  const POSSummary = useSelector(getSummary);
  const navigate = useNavigate();
  const summaryItems = POSSummary?.summaryItems;




  const handleCustomerChange = (data) => {

    dispatch(updateCustomer(data));
  }


  const handleCheckout = () => {
    if (!POSSummary.customer) {
      toast("Please select a customer");
      return
    }

    if (!POSSummary.summaryItems.length) {
      toast("Please add items to the cart");
      return
    }
    navigate("/checkout");
  }

  const saveOrder = async () => {
    const items = POSSummary.summaryItems.map(val => (
      {
        "item": val.id,
        "net_rate": val.price,
        "qty": val.quantity,
        "discount": 0,
        "uom": null
      }
    ))

    const data = {
      "customer": "ee2a5368-3681-4239-a33a-80f3634ddc04",
      "items": items,
      "posting_date": moment(),
    }

    const request = await axios.post(import.meta.env.VITE_API_URL + "/pos/api/order/create", data);
    toast("Order has been saved")

  }

  return (
    <div>
      <div>
        <CustomerField onChange={handleCustomerChange} />
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-center ">Order Summary</h1>
      </div>

      <div className="mb-4">
        <div className="h-[60vh] overflow-x-scroll ">
          <div>

            {summaryItems && summaryItems?.length ?
              summaryItems.map((item, i) => (
                <POSSummaryItem key={i} item={item} />
              )) : <div className="p-2 text-sm text-center">No items have been added</div>
            }

          </div>
        </div>

      </div>
      <div className="mb-4">
        <div className="font-semibold text-sm">
          <div className="mb-1">Total Quantity: {POSSummary?.totalQty}</div>
          <div className="mb-2"><span>Grand Total:</span> {POSSummary?.grandTotal}</div>
        </div>
      </div>
      <div>

        <div className="flex gap-2 items-center">
          <button className="rounded-md bg-gray-900 px-3 py-2 text-sm  text-white  w-full"
            onClick={handleCheckout}>
            Complete
          </button>
          <button className="rounded-md bg-gray-900 px-3 py-2 text-sm  text-white w-full">
            Cancel
          </button>

        </div>
      </div>
    </div>
  );

};

export const POSSummaryItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  const handleUpdateQuantity = (type?: string | null) => {
    dispatch(updateItemQuantity({ id: item.id, type: type }));
  };

  const image = item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s";

  if (!item) return;

  return (
    <div className="border mb-2 p-1 rounded">
      <div className="flex gap-1 flex-auto">
        <div className="flex-shrink-0 ">
          <img className="w-20 h-20 object-contain" src={image} alt="" />
        </div>
        <div className="pt-2 flex-auto ">
          <div className="flex gap-1">
            <div className="flex-auto">
              <div className="text-sm line-clamp-2">{item.item_name}</div>
            </div>

            <div className="flex-shrink-0 flex gap-1">
              <div role="button" onClick={handleRemove}>
                <Trash2 className="size-5 stroke-red-800" />
              </div>
              <div>
                <FilePenLine className="size-5" />
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold">{item.category_name}</div>

          <div className="flex justify-between">
            <div className="font-semibold mt-2">$ {item.price || 0}</div>

            <div className="flex justify-end">
              <div className="flex items-center bg-gray-100 rounded-3xl p-1 w-24">
                <button
                  className="rounded-full bg-white cursor-pointer p-1"
                  onClick={() => handleUpdateQuantity()}
                >
                  <Minus className="size-4" />
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  className="h-full w-full bg-transparent outline-none text-center font-bold"
                  readOnly
                />
                <button
                  className="rounded-full bg-white cursor-pointer p-1"
                  onClick={() => handleUpdateQuantity("add")}
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};




const CustomerField = ({ onChange }) => {
  const customerQuery = useQuery({
    queryKey: ["customer"],
    queryFn: fetchCustomer,
  });



  interface OptionType {
    label: string
    value: string
  }


  const [options, setOptions] = useState<OptionType[]>([]);
  const [value, setValue] = useState<OptionType>(null);



  useEffect(() => {
    if (customerQuery.data) {
      const data = customerQuery.data.map((customer: object) => {
        return {
          label: customer.customer_name,
          value: customer.id
        }
      })
      setOptions(data);
    }

  }, [customerQuery.data])

  const handleSelect = (value: OptionType) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="mb-2 flex gap-1 items-center justify-between w-full py-2  px-2 rounded-md border border-gray-300 text-sm bg-mint-500 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          {
            value ? value.label
              : "Select Customer..."}

          <ChevronsUpDown className="opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0 ">
        <Command>
          <Command.List>
            <Command.Group>
              {

                options && options.length ?
                  options.map((row) => (
                    <Command.Item
                      key={row.value}
                      className="relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                      value={row.value}
                      onSelect={() => handleSelect(row)}
                    >
                      {row.label}
                      {value?.value === row.value && (
                        <Check className={cn("ml-auto", "opacity-100")} />
                      )}
                    </Command.Item>
                  ))
                  : <div className="py-6 text-center text-sm">No results found.</div>
              }

            </Command.Group>
          </Command.List>
        </Command>
      </PopoverContent>

    </Popover>)
}