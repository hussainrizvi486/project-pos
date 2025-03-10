import { useDispatch, useSelector } from "react-redux";
import {
  getPosSummary,
  removeItem,
  updateItemQuantity,
} from "../../features/pos/reducers/summary";
import axios from "axios";
import { Divide, FilePenLine, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import moment from "moment";

interface POSItem { }

export const Summary = () => {
  const POSSummary = useSelector(getPosSummary);
  const summaryItems = POSSummary?.summaryItems;

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
    console.warn(import.meta.env.VITE_API_URL + "/pos/api/order/create")
    const request = await axios.post(import.meta.env.VITE_API_URL + "/pos/api/order/create", data);

    console.log(request.status)
  }

  return (
    <div>
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
            onClick={saveOrder}>
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
