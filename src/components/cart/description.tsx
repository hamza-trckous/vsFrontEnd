export const Description = ({ description }: { description: string }) => {
  return (
    <p className="text-gray-700 mb-2 break-words max-w-30 sm:hidden visible text-sm ">
      {description}
    </p>
  );
};
