import Container from "@/components/dashbord/multualCompenents/Container";
import TitleRtl from "@/components/dashbord/multualCompenents/Title";
import React from "react";
import FormForAddingCategory from "@/components/dashbord/Categorys/FormForAddingCategory";
import FirstLineOfTable from "@/components/Table/FirstLine";
import { itemsTAbleCategory } from "@/utils/dashboard/category";
import BodyOfTableCategory from "@/components/dashbord/Categorys/BodyOFTable";
const page = () => {
  return (
    <Container>
      <TitleRtl title={" اضافة فئة جديدة"} />
      <FormForAddingCategory />
      <hr></hr>
      <table className="w-full table-fixed border-collapse text-sm bg-teal-50">
        <FirstLineOfTable tableTitles={itemsTAbleCategory} />
        <BodyOfTableCategory />
      </table>
    </Container>
  );
};

export default page;
