import { NewProduct, ProductWithreviews } from "@/Types/ProductPart";
import React from "react";
import FirstLineOfTable from "../Table/FirstLine";
import BodyOfTableOfProductPart from "./BodyOfTableOfProductPart";
import BodyOfTableLandingAndProductEdit from "../Table/BodyOfTable";
import { TableTitles } from "@/utils/Table/Table";

const Table = ({
  products = [],
  onDelete,
  landingPage = false,
}: {
  products: NewProduct[] | ProductWithreviews[];
  onDelete?: (id: string) => void;
  landingPage?: boolean;
}) => {
  const tableTitles = TableTitles();
  return (
    <div className="relative overflow-x-auto">
      <BodyOfTableOfProductPart>
        <FirstLineOfTable tableTitles={tableTitles} />
        <BodyOfTableLandingAndProductEdit
          landingPage={landingPage}
          onDelete={onDelete}
          items={products}
        />
      </BodyOfTableOfProductPart>
    </div>
  );
};

export default Table;
