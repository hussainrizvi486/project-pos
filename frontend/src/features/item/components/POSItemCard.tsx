export const POSItemCard = ({ item }) => {
  if (!item) return;
  return (
    <div
      className="p-2 h-48 bg-white rounded-md cursor-pointer 
       shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]
        "
    >
      <div className="h-28">
        <img
          src={item.image}
          alt={item.item_name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="item-card__details">
        <div className="text-sm overflow-hidden min-h-10 line-clamp-2">
          {item.item_name}
        </div>
        <div className="text-sm font-semibold  mt-1">$ {item.price}</div>
      </div>
    </div>
  );
};
