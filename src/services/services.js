import { master } from "./master";

export class Services extends master {
  get() {
    axios.post("http://localhost:3001/api/service/get", {}).then((res) => {
      var array = [];
      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isDeleted === "No") {
          array.push({
            label: res.data.list[i].vProduct,
            id: res.data.list[i].iProductID,
            categoryID: res.data.list[i].iCategoryID,
          });
        }
      }
      setRows(array);
    });
  }
}
