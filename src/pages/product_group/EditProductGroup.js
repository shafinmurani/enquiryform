import React from "react";
import DrawerComponent from "../../components/DrawerComponent";

import BreadcrumbsComponent from "../../components/BreadcrumbsComponent";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function EditProductGroup() {
  return (
    <>
      <DrawerComponent title="Add Product Group">
        <BreadcrumbsComponent />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Edit Product Group</h1>
        </div>
      </DrawerComponent>
    </>
  );
}
