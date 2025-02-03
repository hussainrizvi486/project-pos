export const POSItemCard = ({ item }) => {
  const image = item.image ? "http://127.0.0.1:8000/" + item.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsuilBKtOw0Fx1T2c1-nJvBfWLawRf17S-Ug&s"
  return (
    <div
      className="p-1 h-48 bg-white rounded-md cursor-pointer border border-gray-300
        "
    >
      <div className="h-28">
        <img
          src={image}
          alt={item.item_name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="item-card__details">
        <div className="text-sm overflow-hidden min-h-10 line-clamp-2">
          {item.item_name}
        </div>
        <div className="text-sm font-semibold  mt-1">$ {item.price || 0}</div>
      </div>
    </div>
  );
};
