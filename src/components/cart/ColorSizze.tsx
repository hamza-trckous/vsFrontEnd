import { Product } from "@/Types/ProductPart";

export const SizesOrColor = ({
  item,
  itemsTitle,
}: {
  item: Product["sizes"] | Product["colors"];
  itemsTitle: string;
}) => {
  return (
    <div className="flex justify-start mb-2">
      <span className="font-bold">{itemsTitle}</span>
      <div className="flex justify-start ml-2 max-width-[200px] flex-wrap">
        {item.map((size, index) => (
          <span
            key={index}
            className="whitespace-nowrap border rounded-lg px-2 py-1 bg-gray-200 text-gray-700 text-sm ml-2 mb-2"
          >
            {size}
          </span>
        ))}
      </div>
    </div>
  );
};
