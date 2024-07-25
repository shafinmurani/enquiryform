import { Company } from "./company";
import { JWT } from "./jwt";
import { ServiceGroup } from "./service_group";
import { Renewals } from "./renewals";

const jwt = new JWT();
const company = new Company();
const decodedToken = jwt.parse(sessionStorage.getItem("jwt-token"));
const serviceGroup = new ServiceGroup();
const renewals = new Renewals();
export { jwt, company, decodedToken, serviceGroup, renewals };
