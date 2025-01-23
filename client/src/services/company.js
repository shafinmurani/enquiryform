import { master } from "./master";
import axios from "axios";
export class Company extends master {
  // Filter Function
  filter = (keyword, rows) => {
    if (keyword.length === 0) {
      return rows;
    } else {
      const lowercasedKeyword = keyword.toLowerCase();
      return rows.filter((row) =>
        row.vCompanyName
          ? row.vCompanyName.toLowerCase().includes(lowercasedKeyword)
          : false,
      );
    }
  };
  // Delete company account
  delete = (deleteId) => {
    return axios.post("http://localhost:3001/api/company/delete", {
      id: deleteId,
    });
  };
  // Get company accounts
  get = () => {
    return axios.post("http://localhost:3001/api/company/get", {});
  };
}
