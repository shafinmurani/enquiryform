import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import axios from "axios";
import "../../styles/AddProductGroup.css";
import AddGroupComponent from "./AddGroupComponent";

export default function AddProductGroup() {
  return (
    <>
      <DrawerComponent title="Add Service Group">
        <AddGroupComponent />
      </DrawerComponent>
    </>
  );
}
