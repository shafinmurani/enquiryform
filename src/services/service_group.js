import { master } from "./master";
import axios from "axios";
import { decodedToken } from "./services_export";
export class ServiceGroup extends master {
  delete(deleteId) {
    axios.post("http://localhost:3001/api/service-group/delete", {
      id: deleteId,
    });
  }
  async get() {
    const res = await axios.post(
      "http://localhost:3001/api/service-group/get",
      { decodedToken },
    );
    var array = [];
    for (var i = 0; i < res.data.list.length; i++) {
      if (res.data.list[i].isDeleted == "No") {
        array.push({
          label: res.data.list[i].vCategory,
          id: res.data.list[i].iCategoryID,
          dtCreated: res.data.list[i].dtCreated,
          dtModified: res.data.list[i].dtModified,
        });
      }
    }
    return array;
  }
}
