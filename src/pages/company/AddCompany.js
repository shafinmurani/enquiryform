import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import "../../styles/AddProductGroup.css";
import AddCompanyComponent from "./AddCompanyComponent";

export default function AddCompany() {
  return (
    <>
      <DrawerComponent title="Add Company">
        <AddCompanyComponent />
      </DrawerComponent>
    </>
  );
}
