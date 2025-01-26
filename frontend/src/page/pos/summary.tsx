import { useDispatch, useSelector } from "react-redux";
import {
  getPosSummary,
  removeItem,
  updateItemQuantity,
} from "../../features/pos/reducers/summary";
import { Minus, Plus, Trash2 } from "lucide-react";

interface POSItem {}

export const Summary = () => {
  const POSSummary = useSelector(getPosSummary);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-center ">Order Summary</h1>
      </div>

      <div className="mb-4">
        {POSSummary?.summaryItems?.map((item, index) => (
          <POSSummaryItem key={index} item={item} />
        ))}
      </div>
      <div className="mb-4">
        <div className="font-semibold text-sm">
          <div className="mb-2">Total Quantity: {POSSummary?.totalQty}</div>
          <div className="mb-2"><span>Grand Total:</span> {POSSummary?.grandTotal}</div>
        </div>
      </div>
      <div>
      {/* inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 */}
      <div className="flex gap-2 items-center">

        <button className="text-sm font-medium inline-flex items-center justify-center focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-4
        bg-sky-600 text-white rounded-md
        ">Save Order</button>
        <button className="text-sm font-medium inline-flex items-center justify-center focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 px-4
        bg-red-500 text-white rounded-md
        ">Cancel Order</button>
      </div>
      </div>
    </div>
  );
  return (
    <div className="w-[350px]">
      <div className="font-bold text-center text-sm">Order Summary</div>
      <div className="pos-summary-items">
        {summaryItems.map((item, index) => (
          <POSSummaryItem key={index} item={item} />
        ))}
      </div>
      <div className="pos-summary-detail"></div>
      <div className="pos-summary-actions">
        {/* <div className="flex gap-1">
            <button className="btn">Save Order</button>
            <button className="btn">Cancel Order</button>
          </div> */}
        {/* <div className="total-cost">Total Cost: ${totalCost.toFixed(2)}</div> */}
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

  if (!item) return;

  return (
    <div className="border mb-2 p-2 rounded">
      <div className="flex justify-between">
        <div className="flex gap-2 flex-auto">
          <div className="border rounded overflow-hidden flex-shrink-0">
            <img className=" max-w-[6rem] h-full" src={item.image} alt="" />
          </div>
          <div className="pt-2 flex-auto ">
            <div className="text-sm line-clamp-2">{item.item_name}</div>
            <div className="text-sm">{item.category}</div>
            <div className="font-semibold mt-2">$ {item.price}</div>
          </div>
        </div>

        <div>
          <div role="button" onClick={handleRemove}>
            <Trash2 className="size-5 stroke-red-500" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center bg-gray-100 rounded-3xl p-1 w-32">
          <button
            className="rounded-full bg-white cursor-pointer p-2"
            onClick={() => handleUpdateQuantity()}
          >
            <Minus className="size-5" />
          </button>
          <input
            type="text"
            value={item.quantity}
            className="h-full w-full bg-transparent outline-none text-center"
            readOnly
          />
          <button
            className="rounded-full bg-white cursor-pointer p-2"
            onClick={() => handleUpdateQuantity("add")}
          >
            <Plus className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
