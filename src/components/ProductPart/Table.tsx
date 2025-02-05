import { ProductWithreviews } from "@/Types/ProductPart";
import React from "react";

import FirstLineOfTable from "../Table/FirstLine";
import { tableTitles } from "@/utils/Table/Table";
import BodyOfTable from "../Table/BodyOfTable";

const Table = ({
  products = [],
  onDelete,
  landingPage = false,
}: {
  products: ProductWithreviews[];
  onDelete?: (id: string) => void;
  landingPage?: boolean;
}) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-sm bg-teal-50">
        <FirstLineOfTable tableTitles={tableTitles} />
        <BodyOfTable
          landingPage={landingPage}
          onDelete={onDelete}
          items={products}
        />
      </table>
    </div>
  );
};

export default Table;
