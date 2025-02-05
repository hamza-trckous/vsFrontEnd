"use client";
import React from "react";
import Container from "../../dashbord/multualCompenents/Container";
import SideBarCategory from "./SideBarCategoru";
import ShowPart from "./ShowPart";

const ShowProductCategory = () => {
  return (
    <Container forCategorys={true}>
      <SideBarCategory />
      <ShowPart />
    </Container>
  );
};

export default ShowProductCategory;
